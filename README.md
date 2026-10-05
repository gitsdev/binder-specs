# Binder Document Matrix

Static page (`index.html`, `app.js`, `data/documents.js`) plus one Vercel serverless function (`api/documents.js`) that stores edits and approvals in Upstash Redis, so every reviewer sees the same state.

## Deploy to Vercel

1. Push this folder to a Git repo and import it in Vercel (Framework preset: **Other**, no build command), or run `vercel` in this folder.
2. In the Vercel project: **Storage → Create Database → Upstash for Redis** (free tier is fine) and connect it to the project. This sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
3. Redeploy so the function picks up the new environment variables.

## Local development

The page needs the API, so open it through `vercel dev` (after `vercel link` and `vercel env pull`), not by double-clicking `index.html`.

## How data works

- `data/documents.js` is the baseline list of 41 documents.
- The database only holds rows someone changed or approved; they override the baseline row with the same `id`.
- **Reset** clears the database for everyone. **Import** replaces it for everyone. **Export JSON** downloads the current state.
- Open pages re-sync every 20 seconds and whenever the tab regains focus.

## Access

Anyone who can open the site can edit and approve. To restrict it, turn on **Settings → Deployment Protection** in Vercel (or ask for a password check in the API).
