// Document Adjudication Matrix — editing, enforcement levels and approvals.
// State is shared through the /api/documents serverless function (Upstash Redis on Vercel).
(function () {
  const API = '/api/documents';
  const POLL_MS = 20000;

  const ENFORCEMENT = {
    'mand-all':        { label: 'MANDATORY FOR ALL',          icon: 'lock',                   badge: 'bg-error text-on-error font-black',          dot: 'bg-surface-container-lowest' },
    'mand-triggered':  { label: 'MANDATORY IF TRIGGERED',     icon: 'check_circle',           badge: 'bg-amber-50 text-amber-900 font-bold',       dot: 'bg-amber-600' },
    'mand-noncitizen': { label: 'MANDATORY FOR NON CITIZENS', icon: 'check_circle',           badge: 'bg-indigo-50 text-indigo-900 font-bold',     dot: 'bg-indigo-600' },
    'not-mandatory':   { label: 'NOT MANDATORY',              icon: 'radio_button_unchecked', badge: 'bg-surface-container text-on-surface-variant font-semibold', dot: 'bg-outline' },
    'configurable':    { label: 'CONFIGURABLE',               icon: 'help_outline',           badge: 'border border-dashed border-outline text-on-surface-variant font-semibold', dot: 'bg-transparent' }
  };

  const FILTERS = {
    'all':             () => true,
    'blocking':        d => d.blocking,
    'mand-triggered':  d => d.enforcement === 'mand-triggered' || d.enforcement === 'mand-noncitizen',
    'mand-all':        d => d.enforcement === 'mand-all',
    'mand-noncitizen': d => d.enforcement === 'mand-noncitizen',
    'not-mandatory':   d => d.enforcement === 'not-mandatory',
    'pending-cfg':     d => d.routes.length === 0,
    'approved':        d => d.approved,
    'unapproved':      d => !d.approved
  };

  const seed = (window.BINDER_DOCUMENTS || []).map(normalize);
  let docs = seed.map(clone);
  let activeFilterKey = 'all';
  let editingId = null;
  let loaded = false;
  let inflight = 0;

  // ---------- state ----------
  function normalize(d) {
    return {
      id: String(d.id),
      name: d.name || '',
      routes: Array.isArray(d.routes) ? d.routes.map(r => ({ category: r.category || '', subCategory: r.subCategory || '' })) : [],
      trigger: d.trigger || '',
      enforcement: ENFORCEMENT[d.enforcement] ? d.enforcement : 'configurable',
      blocking: !!d.blocking,
      approved: !!d.approved,
      approvedAt: d.approvedAt || null
    };
  }

  async function api(method, body) {
    const res = await fetch(API, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    });
    let data = {};
    try { data = await res.json(); } catch (e) { /* non-JSON error page */ }
    if (!res.ok) throw new Error(data.error || 'Server responded ' + res.status);
    return data;
  }

  // Stored rows override the seed; seed order is kept and new seed rows appear automatically.
  function merge(stored) {
    return seed.map(s => stored[s.id] ? normalize(stored[s.id]) : clone(s));
  }

  async function refresh() {
    if (editingId || inflight) return; // never yank the table out from under someone mid-edit
    try {
      const data = await api('GET');
      docs = merge(data.documents || {});
      loaded = true;
      setStatus('ok');
      render();
    } catch (err) {
      setStatus('error', 'Cannot load shared data: ' + err.message);
    }
  }

  // Optimistic save of one row; rolls back if the server rejects it.
  async function saveDoc(d, previous) {
    setStatus('saving');
    inflight++;
    try {
      const data = await api('PUT', { document: d });
      Object.assign(d, normalize(data.document));
      setStatus('saved');
    } catch (err) {
      Object.assign(d, previous);
      setStatus('error', 'Save failed: ' + err.message);
    } finally {
      inflight--;
    }
    render();
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function find(id) { return docs.find(d => d.id === id); }

  function isModified(d) {
    const s = seed.find(x => x.id === d.id);
    if (!s) return true;
    return JSON.stringify([s.routes, s.trigger, s.enforcement]) !== JSON.stringify([d.routes, d.trigger, d.enforcement]);
  }

  // ---------- rendering ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function renderRoutes(d) {
    if (d.routes.length === 0) {
      return '<span class="px-space-xs py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold inline-flex items-center gap-1 whitespace-nowrap"><span class="material-symbols-outlined text-[14px]">pending</span>Pending Configuration</span>';
    }
    return '<div class="flex flex-col gap-1">' + d.routes.map(r =>
      '<div class="flex flex-col"><span class="font-label-md text-label-md text-primary font-medium">' + esc(r.category) + '</span>' +
      (r.subCategory ? '<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">↳ ' + esc(r.subCategory) + '</span>' : '') +
      '</div>').join('') + '</div>';
  }

  function enforcementSelect(d) {
    const e = ENFORCEMENT[d.enforcement];
    const locked = d.approved || !loaded;
    const opts = Object.keys(ENFORCEMENT).map(k =>
      '<option value="' + k + '"' + (k === d.enforcement ? ' selected' : '') + '>' + ENFORCEMENT[k].label + '</option>').join('');
    return '<div class="relative inline-flex items-center">' +
      '<span class="w-1.5 h-1.5 rounded-full ' + e.dot + ' absolute left-2 pointer-events-none"></span>' +
      '<select data-action="enforcement" data-id="' + d.id + '" aria-label="Enforcement level for ' + esc(d.name) + '"' + (locked ? ' disabled' + (d.approved ? ' title="Unapprove to change"' : '') : '') +
      ' class="enf-select appearance-none pl-5 pr-6 py-0.5 rounded font-label-sm text-label-sm whitespace-nowrap ' + e.badge + (locked ? ' cursor-not-allowed' : ' cursor-pointer') + ' focus:outline-none focus:ring-1 focus:ring-primary">' + opts + '</select>' +
      (locked ? '' : '<span class="material-symbols-outlined text-[14px] absolute right-1 pointer-events-none opacity-70">expand_more</span>') +
      '</div>';
  }

  function viewRow(d) {
    const e = ENFORCEMENT[d.enforcement];
    const pending = d.routes.length === 0;
    const rowTone = d.approved ? 'bg-secondary-container/20' : pending ? 'bg-error-container/20' : '';
    const dim = d.enforcement === 'not-mandatory' && !d.approved ? ' opacity-75' : '';
    return '<tr class="matrix-row hover:bg-surface-container-low transition-colors group align-top ' + rowTone + dim + '" data-id="' + d.id + '">' +
      '<td class="py-3 px-space-md"><div class="flex items-start gap-space-xs">' +
        '<span class="font-mono text-label-sm font-bold mt-0.5 ' + (pending ? 'text-error' : 'text-on-surface-variant') + '">#' + esc(d.id) + '</span>' +
        '<div class="flex flex-col gap-0.5"><span class="font-headline-sm text-headline-sm text-primary font-semibold">' + esc(d.name) + '</span>' +
        (isModified(d) ? '<span class="font-label-sm text-label-sm text-on-tertiary-container font-bold uppercase">Edited</span>' : '') +
        '</div></div></td>' +
      '<td class="py-3 px-space-md">' + renderRoutes(d) + '</td>' +
      '<td class="py-3 px-space-md"><div class="inline-flex items-start gap-1 text-on-surface-variant font-body-sm">' +
        '<span class="material-symbols-outlined text-[14px] mt-px ' + (d.enforcement === 'mand-all' ? 'text-primary' : d.enforcement === 'not-mandatory' || d.enforcement === 'configurable' ? 'text-outline' : 'text-secondary') + '">' + e.icon + '</span>' +
        '<span>' + (d.trigger ? esc(d.trigger) : '<em class="text-outline">No trigger rule</em>') + '</span></div></td>' +
      '<td class="py-3 px-space-md text-right">' + enforcementSelect(d) + '</td>' +
      '<td class="py-3 px-space-md text-center"><div class="flex flex-col items-center gap-1">' +
        '<input type="checkbox" data-action="approve" data-id="' + d.id + '" aria-label="Approve ' + esc(d.name) + '"' + (d.approved ? ' checked' : '') + (loaded ? '' : ' disabled') +
        ' class="w-4 h-4 rounded text-secondary focus:ring-primary border-outline-variant cursor-pointer">' +
        (d.approved && d.approvedAt ? '<span class="font-label-sm text-label-sm text-secondary font-mono whitespace-nowrap">' + esc(fmtDate(d.approvedAt)) + '</span>' : '') +
      '</div></td>' +
      '<td class="py-3 px-space-md text-center">' +
        (!loaded ? ''
          : d.approved
          ? '<span class="material-symbols-outlined text-[18px] text-outline" title="Unapprove to edit">lock</span>'
          : '<button type="button" data-action="edit" data-id="' + d.id + '" class="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors" title="Edit PBS category & trigger rule" aria-label="Edit ' + esc(d.name) + '"><span class="material-symbols-outlined text-[18px]">edit</span></button>') +
      '</td></tr>';
  }

  const inputCls = 'w-full px-2 py-1 rounded bg-surface-container-lowest border border-outline-variant font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary';

  function routeEditor(r, i) {
    return '<div class="route-edit flex flex-col gap-1 p-2 rounded bg-surface-container-low" data-index="' + i + '">' +
      '<div class="flex items-center gap-1"><input list="pbs-categories" class="route-cat ' + inputCls + '" placeholder="PBS category" value="' + esc(r.category) + '">' +
      '<button type="button" data-action="remove-route" class="p-1 rounded hover:bg-error-container text-error shrink-0" title="Remove routing" aria-label="Remove routing"><span class="material-symbols-outlined text-[16px]">close</span></button></div>' +
      '<input list="pbs-subcategories" class="route-sub ' + inputCls + ' font-mono" placeholder="↳ Sub-folder (optional)" value="' + esc(r.subCategory) + '">' +
      '</div>';
  }

  function editRow(d) {
    return '<tr class="matrix-row bg-primary-fixed/40 align-top" data-id="' + d.id + '" data-editing="true">' +
      '<td class="py-3 px-space-md"><div class="flex items-start gap-space-xs"><span class="font-mono text-label-sm font-bold text-on-surface-variant mt-0.5">#' + esc(d.id) + '</span>' +
        '<span class="font-headline-sm text-headline-sm text-primary font-semibold">' + esc(d.name) + '</span></div></td>' +
      '<td class="py-3 px-space-md min-w-[240px]"><div class="flex flex-col gap-1 routes-list">' + d.routes.map(routeEditor).join('') + '</div>' +
        '<button type="button" data-action="add-route" class="mt-1 inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary hover:underline"><span class="material-symbols-outlined text-[14px]">add</span>Add routing</button>' +
        '<p class="mt-1 font-label-sm text-label-sm text-on-surface-variant">Leave empty for “Pending Configuration”.</p></td>' +
      '<td class="py-3 px-space-md min-w-[260px]"><textarea class="edit-trigger ' + inputCls + '" rows="4" placeholder="Trigger rule condition">' + esc(d.trigger) + '</textarea></td>' +
      '<td class="py-3 px-space-md text-right">' + enforcementSelect(d) + '</td>' +
      '<td class="py-3 px-space-md"></td>' +
      '<td class="py-3 px-space-md"><div class="flex flex-col gap-1">' +
        '<button type="button" data-action="save-edit" data-id="' + d.id + '" class="px-2 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-bold hover:bg-primary">Save</button>' +
        '<button type="button" data-action="cancel-edit" class="px-2 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high">Cancel</button>' +
      '</div></td></tr>';
  }

  function fmtDate(iso) {
    const dt = new Date(iso);
    return isNaN(dt) ? '' : dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function render() {
    const query = document.getElementById('matrix-search').value.trim().toLowerCase();
    const match = FILTERS[activeFilterKey] || FILTERS.all;
    const visible = docs.filter(d => {
      if (d.id === editingId) return true;
      if (!match(d)) return false;
      if (!query) return true;
      const hay = [d.id, d.name, d.trigger, ENFORCEMENT[d.enforcement].label]
        .concat(d.routes.flatMap(r => [r.category, r.subCategory])).join(' ').toLowerCase();
      return hay.includes(query);
    });

    document.getElementById('matrix-body').innerHTML = visible.length
      ? visible.map(d => d.id === editingId ? editRow(d) : viewRow(d)).join('')
      : '<tr><td colspan="6" class="py-8 text-center text-on-surface-variant font-body-md">No documents match the current filter.</td></tr>';

    document.getElementById('showing-count-badge').textContent = 'Showing ' + visible.length + ' of ' + docs.length + ' Items';
    renderCounts();
    renderDatalists();
  }

  function renderCounts() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const fn = FILTERS[el.dataset.count];
      if (fn) el.textContent = docs.filter(fn).length;
    });
    const approved = docs.filter(d => d.approved).length;
    const pct = docs.length ? Math.round((approved / docs.length) * 100) : 0;
    document.getElementById('approval-progress-label').textContent = approved + ' of ' + docs.length + ' approved';
    document.getElementById('approval-progress-bar').style.width = pct + '%';
  }

  function renderDatalists() {
    const cats = new Set(), subs = new Set();
    docs.concat(seed).forEach(d => d.routes.forEach(r => { if (r.category) cats.add(r.category); if (r.subCategory) subs.add(r.subCategory); }));
    const opts = s => Array.from(s).sort().map(v => '<option value="' + esc(v) + '"></option>').join('');
    document.getElementById('pbs-categories').innerHTML = opts(cats);
    document.getElementById('pbs-subcategories').innerHTML = opts(subs);
  }

  let statusTimer;
  function setStatus(state, message) {
    const el = document.getElementById('save-indicator');
    const banner = document.getElementById('sync-error');
    clearTimeout(statusTimer);
    if (banner) {
      banner.classList.toggle('hidden', state !== 'error');
      if (state === 'error') banner.querySelector('[data-msg]').textContent = message;
    }
    if (!el) return;
    const views = {
      saving: ['sync', 'Saving…', 'text-on-surface-variant'],
      saved:  ['cloud_done', 'Saved', 'text-secondary'],
      ok:     ['cloud_done', 'Synced', 'text-secondary'],
      error:  ['cloud_off', 'Offline', 'text-error']
    };
    const [icon, label, tone] = views[state] || views.ok;
    el.className = 'font-label-sm text-label-sm font-bold flex items-center gap-1 transition-opacity ' + tone;
    el.innerHTML = '<span class="material-symbols-outlined text-[14px]">' + icon + '</span>' + label;
    if (state === 'saved' || state === 'ok') statusTimer = setTimeout(() => el.classList.add('opacity-0'), 1600);
  }

  // ---------- actions ----------
  function collectEdits(row) {
    const routes = Array.from(row.querySelectorAll('.route-edit')).map(el => ({
      category: el.querySelector('.route-cat').value.trim(),
      subCategory: el.querySelector('.route-sub').value.trim()
    })).filter(r => r.category);
    return { routes, trigger: row.querySelector('.edit-trigger').value.trim() };
  }

  function draftRoutes(row) {
    return Array.from(row.querySelectorAll('.route-edit')).map(el => ({
      category: el.querySelector('.route-cat').value,
      subCategory: el.querySelector('.route-sub').value
    }));
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn || btn.tagName === 'SELECT' || btn.type === 'checkbox') return;
    const row = btn.closest('tr');
    switch (btn.dataset.action) {
      case 'edit':
        editingId = btn.dataset.id;
        render();
        const first = document.querySelector('tr[data-editing] input, tr[data-editing] textarea');
        if (first) first.focus();
        break;
      case 'cancel-edit':
        editingId = null; render();
        break;
      case 'save-edit': {
        const d = find(btn.dataset.id);
        const previous = clone(d);
        Object.assign(d, collectEdits(row));
        editingId = null; render();
        saveDoc(d, previous);
        break;
      }
      case 'add-route': {
        const list = row.querySelector('.routes-list');
        list.insertAdjacentHTML('beforeend', routeEditor({ category: '', subCategory: '' }, list.children.length));
        list.lastElementChild.querySelector('.route-cat').focus();
        break;
      }
      case 'remove-route':
        btn.closest('.route-edit').remove();
        break;
    }
  });

  document.addEventListener('change', e => {
    const el = e.target;
    const d = el.dataset && el.dataset.id ? find(el.dataset.id) : null;
    if (!d) return;
    const previous = clone(d);
    if (el.dataset.action === 'enforcement') {
      d.enforcement = el.value;
      saveDoc(d, previous);
      if (d.id === editingId) {
        // Re-render the edit row without losing in-progress text.
        const row = el.closest('tr');
        const draft = { routes: draftRoutes(row), trigger: row.querySelector('.edit-trigger').value };
        render();
        const newRow = document.querySelector('tr[data-editing]');
        newRow.querySelector('.routes-list').innerHTML = draft.routes.map(routeEditor).join('');
        newRow.querySelector('.edit-trigger').value = draft.trigger;
      } else {
        render();
      }
    } else if (el.dataset.action === 'approve') {
      d.approved = el.checked;
      d.approvedAt = el.checked ? new Date().toISOString() : null;
      render();
      saveDoc(d, previous);
    }
  });

  document.addEventListener('keydown', e => {
    const row = e.target.closest && e.target.closest('tr[data-editing]');
    if (!row) return;
    if (e.key === 'Escape') { editingId = null; render(); }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) row.querySelector('[data-action="save-edit"]').click();
  });

  // ---------- toolbar ----------
  window.setFilter = function (key, buttonEl) {
    activeFilterKey = key;
    document.querySelectorAll('.filter-chip').forEach(b => {
      b.classList.remove('bg-primary-container', 'text-on-primary', 'active-filter', 'shadow-sm');
      b.classList.add('bg-surface-container-low');
    });
    buttonEl.classList.remove('bg-surface-container-low');
    buttonEl.classList.add('bg-primary-container', 'text-on-primary', 'active-filter', 'shadow-sm');
    render();
  };

  window.applyFilters = render;

  window.exportData = function () {
    const payload = { exportedAt: new Date().toISOString(), documents: docs };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'binder-matrix-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  window.importData = function (input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      input.value = '';
      try {
        const parsed = JSON.parse(reader.result);
        const list = Array.isArray(parsed) ? parsed : parsed.documents;
        if (!Array.isArray(list)) throw new Error('No "documents" array found.');
        if (!confirm('Replace the shared matrix for everyone with the ' + list.length + ' documents in this file?')) return;
        setStatus('saving');
        await api('POST', { documents: list.map(normalize) });
        editingId = null;
        await refresh();
        setStatus('saved');
      } catch (err) {
        setStatus('error', 'Import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  window.resetData = async function () {
    if (!confirm('Discard ALL edits and approvals for everyone and restore the original matrix?')) return;
    setStatus('saving');
    try {
      await api('DELETE');
      editingId = null;
      await refresh();
      setStatus('saved');
    } catch (err) {
      setStatus('error', 'Reset failed: ' + err.message);
    }
  };

  window.retrySync = refresh;

  // Initial load, then keep in sync with other reviewers.
  render();
  refresh();
  setInterval(() => { if (!document.hidden) refresh(); }, POLL_MS);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
})();
