// Vercel serverless function: shared storage for the Document Adjudication Matrix.
// Backed by Upstash Redis (Vercel Marketplace → Storage → Upstash for Redis), via its REST API.
// Each document is one field in a Redis hash, so edits to different rows never clobber each other.
//
//   GET    /api/documents          → { documents: { [id]: doc } }   (only rows that were changed/approved)
//   PUT    /api/documents          body { document }                  → upsert one row
//   POST   /api/documents          body { documents: [...] }          → replace everything (import)
//   DELETE /api/documents                                             → clear all edits (reset to seed)

const KEY = 'binder:documents';
const ENFORCEMENT = ['mand-all', 'mand-triggered', 'mand-noncitizen', 'not-mandatory', 'configurable'];

// Vercel's "Connect Store" dialog may add a custom prefix (e.g. STORAGE_KV_REST_API_URL), so match by suffix.
function env(...suffixes) {
  for (const suffix of suffixes) {
    if (process.env[suffix]) return process.env[suffix];
    const key = Object.keys(process.env).find(k => k.endsWith('_' + suffix) && process.env[k]);
    if (key) return process.env[key];
  }
  return '';
}

const REDIS_URL = env('KV_REST_API_URL', 'UPSTASH_REDIS_REST_URL');
const REDIS_TOKEN = env('KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_TOKEN');

async function redis(path, body) {
  const res = await fetch(REDIS_URL.replace(/\/$/, '') + path, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + REDIS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || 'Redis request failed (' + res.status + ')');
  return data;
}

const command = cmd => redis('', cmd).then(d => d.result);
const transaction = cmds => redis('/multi-exec', cmds);

function str(v, max) {
  return typeof v === 'string' ? v.slice(0, max) : '';
}

// Whitelist and bound every field so the store only ever holds well-formed rows.
function sanitize(d) {
  if (!d || typeof d !== 'object') throw new Error('Invalid document');
  const id = str(String(d.id ?? ''), 20).trim();
  if (!id) throw new Error('Document id is required');
  return {
    id,
    name: str(d.name, 300),
    routes: (Array.isArray(d.routes) ? d.routes : []).slice(0, 10).map(r => ({
      category: str(r && r.category, 200).trim(),
      subCategory: str(r && r.subCategory, 200).trim()
    })).filter(r => r.category),
    trigger: str(d.trigger, 2000).trim(),
    enforcement: ENFORCEMENT.includes(d.enforcement) ? d.enforcement : 'configurable',
    blocking: !!d.blocking,
    approved: !!d.approved,
    approvedAt: d.approved ? (str(d.approvedAt, 40) || new Date().toISOString()) : null,
    updatedAt: new Date().toISOString()
  };
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    const missing = [!REDIS_URL && 'KV_REST_API_URL', !REDIS_TOKEN && 'KV_REST_API_TOKEN'].filter(Boolean).join(' and ');
    return send(res, 500, {
      error: 'Database not configured: ' + missing + ' not set for the ' + (process.env.VERCEL_ENV || 'current') +
        ' environment. Add it in Vercel → Settings → Environment Variables, then redeploy.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    switch (req.method) {
      case 'GET': {
        const flat = (await command(['HGETALL', KEY])) || [];
        const documents = {};
        for (let i = 0; i < flat.length; i += 2) {
          try { documents[flat[i]] = JSON.parse(flat[i + 1]); } catch (e) { /* skip corrupt row */ }
        }
        return send(res, 200, { documents });
      }

      case 'PUT': {
        const doc = sanitize(body.document);
        await command(['HSET', KEY, doc.id, JSON.stringify(doc)]);
        return send(res, 200, { document: doc });
      }

      case 'POST': {
        if (!Array.isArray(body.documents)) return send(res, 400, { error: 'Expected { documents: [...] }' });
        const docs = body.documents.slice(0, 500).map(sanitize);
        const hset = ['HSET', KEY];
        docs.forEach(d => hset.push(d.id, JSON.stringify(d)));
        await transaction(docs.length ? [['DEL', KEY], hset] : [['DEL', KEY]]);
        return send(res, 200, { count: docs.length });
      }

      case 'DELETE': {
        await command(['DEL', KEY]);
        return send(res, 200, { ok: true });
      }

      default:
        res.setHeader('Allow', 'GET, PUT, POST, DELETE');
        return send(res, 405, { error: 'Method not allowed' });
    }
  } catch (err) {
    return send(res, /Invalid|required|JSON/.test(err.message) ? 400 : 500, { error: err.message });
  }
};
