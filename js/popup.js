// Airlock extension - popup logic
//
// Every mutation is saved immediately, including a capture still waiting for its
// switch/queue/drop answer (`pending`): the popup closes as soon as it loses
// focus, and an impulse typed then lost is exactly what Airlock exists to prevent.
const THEME_KEY = 'airlock_theme';
// The same script drives the popup and the wide view (pages/wide.html): every
// popup-only behaviour checks this flag.
const WIDE = document.body.dataset.view === 'wide';
const POPUP_QUEUE_MAX = 10;          // past that, the rest is in the wide view

// Closing the window is only ever right for the popup: the wide view is a tab
// the user opened on purpose. Any future close goes through here.
function airlockClosePopup() {
  if (!WIDE) window.close();
}
const UNDO_MS = 8000;

let state = airlockBlank();
let loaded = false;          // a capture typed before the first read is replayed after it
let captureWaiting = false;
const ownWrites = [];         // serialized states we wrote, oldest first, to recognise their echo
let lastSaved = null;         // serialized state as last read or written
let undoSnapshot = null;
let undoTimer = null;
let shortcut = '';            // the one Chrome really bound, read at startup

const $ = id => document.getElementById(id);

// Theme is applied synchronously in <head> (see js/theme.js) to avoid a flash;
// this just wires the toggle button and persists the choice.
$('btnTheme').onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
};

// ─── language picker ────────────────────────────────────────────────────

// A grid of flags with the native name under each (four languages share the
// Indian flag), unfolding below the popup. The choice is stored like the
// Options page does: every surface follows through chrome.storage.onChanged.
const POPUP_MAX_H = 600;

function renderLangPicker() {
  const meta = AIRLOCK_LANG_META[airlockLang];
  $('langFlag').src = `../icons/flags/${meta.flag}.svg`;
  $('btnLang').setAttribute('aria-label', airlockT('langBtnAria', { name: meta.native }));
  $('btnLang').title = meta.native;

  const grid = $('langGrid');
  grid.innerHTML = '';
  for (const [code, m] of Object.entries(AIRLOCK_LANG_META)) {
    const b = document.createElement('button');
    b.className = 'lang-opt';
    b.dataset.lang = code;
    b.lang = code;
    b.setAttribute('aria-pressed', String(code === airlockLang));
    b.tabIndex = code === airlockLang ? 0 : -1;      // one tab stop, arrows inside
    b.innerHTML = `<img src="../icons/flags/${m.flag}.svg" alt=""><span></span>`;
    b.querySelector('span').textContent = m.native;
    grid.appendChild(b);
  }
}

function toggleLangPanel(open) {
  const panel = $('langPanel');
  panel.hidden = !open;
  $('btnLang').setAttribute('aria-expanded', String(open));
  if (!open) return;
  if (!WIDE) {
    // whatever is left of the 600 px once the rest of the popup is laid out
    panel.style.maxHeight = '';
    const top = panel.getBoundingClientRect().top + window.scrollY;
    panel.style.maxHeight = Math.max(160, POPUP_MAX_H - top - 16) + 'px';
  }
  panel.scrollIntoView({ block: 'nearest' });
  const current = $('langGrid').querySelector('[aria-pressed="true"]');
  if (current) current.focus();
}

$('btnLang').onclick = () => toggleLangPanel($('langPanel').hidden);

$('langGrid').addEventListener('click', e => {
  const b = e.target.closest('.lang-opt');
  if (!b) return;
  chrome.storage.local.set({ [AIRLOCK_LANG_KEY]: b.dataset.lang });
  toggleLangPanel(false);
  $('btnLang').focus();
});

$('langGrid').addEventListener('keydown', e => {
  const items = [...$('langGrid').querySelectorAll('.lang-opt')];
  const i = items.indexOf(document.activeElement);
  if (i === -1) return;
  const cols = getComputedStyle($('langGrid')).gridTemplateColumns.split(' ').length;
  const back = airlockIsRtl() ? 1 : -1;            // arrows follow the reading direction
  const step = { ArrowLeft: back, ArrowRight: -back, ArrowUp: -cols, ArrowDown: cols,
    Home: -i, End: items.length - 1 - i }[e.key];
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    toggleLangPanel(false);
    $('btnLang').focus();
    return;
  }
  if (step === undefined) return;
  e.preventDefault();
  const next = items[Math.min(items.length - 1, Math.max(0, i + step))];
  items[i].tabIndex = -1;
  next.tabIndex = 0;
  next.focus();
});

function load() {
  chrome.storage.local.get([AIRLOCK_KEY], r => {
    state = airlockNormalize(r[AIRLOCK_KEY]);
    lastSaved = JSON.stringify(state);
    loaded = true;
    render();
    if (captureWaiting) { captureWaiting = false; capture(); }
  });
}

// Content scripts and the service worker pick the change up through
// chrome.storage.onChanged: no message passing needed.
function save() {
  state = airlockNormalize(state);
  const json = JSON.stringify(state);
  // Chrome fires no onChanged for an unchanged value: that echo would never
  // come and its entry would wait forever.
  if (json === lastSaved) return;
  lastSaved = json;
  ownWrites.push(json);
  chrome.storage.local.set({ [AIRLOCK_KEY]: state });
}

// Another surface (methodology tab, options import) changed the data while the
// popup was open: adopt it so the next save doesn't write a stale copy back.
// The echo of our own writes is ignored: it can arrive after a newer local
// change (Enter then "2" in quick succession) and would roll it back.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes[AIRLOCK_KEY]) return;
  const incoming = airlockNormalize(changes[AIRLOCK_KEY].newValue);
  const json = JSON.stringify(incoming);
  // echoes arrive in write order: older entries still listed were superseded
  const i = ownWrites.indexOf(json);
  if (i !== -1) { ownWrites.splice(0, i + 1); return; }
  state = incoming;
  lastSaved = json;
  render();
});

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function render() {
  // Focus bar
  const dot = $('dot'), ft = $('focusText'), ns = $('nextStep');
  if (state.focus) {
    dot.className = 'dot';
    ft.className = 'focus-text';
    ft.textContent = state.focus;
  } else {
    dot.className = 'dot idle';
    ft.className = 'focus-text empty';
    ft.textContent = airlockT('focusEmpty');
  }
  $('btnDone').disabled = !state.focus;

  const next = airlockNextStep(state, state.focus);
  if (next) {
    ns.innerHTML = '<b></b> <span></span>';
    ns.querySelector('b').textContent = airlockT('nextStepLabel');
    ns.querySelector('span').textContent = next;
    ns.hidden = false;
  } else {
    ns.hidden = true;
  }

  // Decision (restored if the popup was closed before answering)
  if (state.pending) {
    // the focus can be gone meanwhile (marked done, changed from another page)
    $('decisionQ').innerHTML = '<b></b><br><span class="sub"></span>';
    $('decisionQ').querySelector('b').textContent = `"${state.pending}"`;
    $('decisionQ').querySelector('.sub').textContent = state.focus
      ? airlockT('decisionAhead', { focus: state.focus })
      : airlockT('decisionNoFocus');
    $('decision').classList.add('visible');
    $('hint').textContent = airlockT('hintDecision');
  } else {
    $('decision').classList.remove('visible');
    $('hint').textContent = shortcut
      ? airlockT('hintEnterShortcut', { shortcut })
      : airlockT('hintEnter');
  }

  // Queue
  const q = $('queue');
  if (state.queue.length === 0) {
    q.innerHTML = '<div class="empty"></div>';
    q.firstChild.textContent = airlockT('queueEmptyPopup');
  } else {
    q.innerHTML = '';
    const shown = WIDE ? state.queue : state.queue.slice(0, POPUP_QUEUE_MAX);
    shown.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'queue-item' + (i === 0 ? ' top' : '');
      div.innerHTML = `
        <span class="qnum">${i+1}</span>
        <span class="qtext"></span>
        <div class="qbtns">
          <button class="btn-x go" data-act="focus" data-i="${i}" title="${airlockT('toFocus')}" aria-label="${airlockT('toFocus')}">→</button>
          ${i > 0 ? `<button class="btn-x" data-act="up" data-i="${i}" title="${airlockT('moveUp')}" aria-label="${airlockT('moveUp')}">↑</button>` : ''}
          <button class="btn-x danger" data-act="del" data-i="${i}" title="${airlockT('remove')}" aria-label="${airlockT('remove')}">×</button>
        </div>`;
      div.querySelector('.qtext').textContent = item;
      q.appendChild(div);
    });
  }

  const hiddenCount = state.queue.length - POPUP_QUEUE_MAX;
  $('queueMore').hidden = WIDE || hiddenCount <= 0;
  if (hiddenCount > 0) $('queueMore').textContent = airlockT('queueMore', hiddenCount);

  // Done today (the full history is on the Options page)
  const ds = $('doneSection'), dl = $('done');
  const since = startOfToday();
  const today = state.done.filter(d => d.at && d.at >= since);
  if (today.length === 0) {
    ds.style.display = 'none';
  } else {
    ds.style.display = 'block';
    dl.innerHTML = '';
    (WIDE ? today : today.slice(-5)).reverse().forEach(d => {
      const div = document.createElement('div');
      div.className = 'done-item';
      div.innerHTML = '<span class="check">✓</span><span></span>';
      div.querySelector('span:last-child').textContent = d.text;
      dl.appendChild(div);
    });
  }

  $('count').textContent = airlockT('queueCount', state.queue.length);
  renderGuard();
}

// ─── undo ───────────────────────────────────────────────────────────────

// A misclick must never cost an idea: every removal can be reverted for a few
// seconds, without a confirmation dialog in the way.
function withUndo(message, mutate) {
  undoSnapshot = JSON.stringify(state);
  mutate();
  save(); render();

  $('toastText').textContent = message;
  $('toast').className = 'toast visible';
  clearTimeout(undoTimer);
  undoTimer = setTimeout(hideToast, UNDO_MS);
}

function hideToast() {
  $('toast').className = 'toast';
  undoSnapshot = null;
}

function undo() {
  if (!undoSnapshot) return;
  state = airlockNormalize(JSON.parse(undoSnapshot));
  hideToast();
  save(); render();
}

// ─── actions ────────────────────────────────────────────────────────────

function capture() {
  if (!loaded) { captureWaiting = true; return; }
  const val = $('input').value.trim();
  if (!val) return;
  $('input').value = '';

  if (!state.focus) {
    state.focus = val;
    save(); render();
    return;
  }

  // A previous capture still unanswered: park it in the queue rather than lose it.
  if (state.pending) state.queue.push(state.pending);

  state.pending = val;
  save(); render();
  // Focus stays in the (now empty) field: 1/2/3 answer from there. Moving it to
  // a decision button would let the Enter that just captured "click" it.
}

function decide(kind, forced) {
  if (!state.pending) return;
  if (kind === 'switch' && !forced && guardWanted()) {
    startGuard({ kind: 'switch', idea: state.pending });
    return;
  }
  const val = state.pending;
  state.pending = null;
  if (kind === 'switch') {
    if (state.focus) state.queue.unshift(state.focus);
    state.focus = val;
  } else if (kind === 'queue') {
    state.queue.push(val);
  } else if (kind === 'drop') {
    // drop is a legitimate answer: no counter, no trace, only a safety net for misclicks
    state.pending = val;
    withUndo(airlockT('toastDropped'), () => { state.pending = null; });
    $('input').focus();
    return;
  }
  save(); render();
  $('input').focus();
}

function markDone() {
  if (!state.focus) return;
  const finished = state.focus;
  withUndo(airlockT('toastDone', { text: finished }), () => {
    state.done.push({ text: finished, at: Date.now() });
    if (state.done.length > AIRLOCK_DONE_MAX) state.done = state.done.slice(-AIRLOCK_DONE_MAX);
    state.focus = state.queue.shift() || null;
  });
}

// A queued idea becomes the focus, the old focus goes back to the front.
function promote(item) {
  const i = state.queue.indexOf(item);
  if (i === -1) return;
  state.queue.splice(i, 1);
  if (state.focus) state.queue.unshift(state.focus);
  state.focus = item;
  save(); render();
}

// ─── focus guard ────────────────────────────────────────────────────────

// Switching away from an unfinished focus asks "is it done?" first (js/guard.js
// only decides when the question can be skipped). Two triggers: the switch
// answer (1) and the → of a queued idea. Never a capture.
let guardSettings = airlockGuardSettings();
let guardPrepared = false;
let guard = null;               // { kind: 'switch'|'promote', idea, stage: 'checking'|'ask'|'insist' }

function guardWanted() {
  return guardSettings.enabled && !!state.focus && !airlockFocusFinished(state);
}

function prepareGuard() {
  if (guardSettings.enabled && !guardPrepared) { guardPrepared = true; airlockGuardPrepare(); }
}

async function startGuard(g) {
  guard = { ...g, stage: 'checking' };
  renderGuard();
  const res = await airlockGuardCheck(state.focus, g.idea, guardSettings.sensitivity);
  window.airlockGuardLast = res;              // read by the end-to-end tests
  if (!guard || guard.idea !== g.idea || guard.stage !== 'checking') return;   // cancelled meanwhile
  if (res.skip) {
    guard = null;
    renderGuard();
    if (g.kind === 'switch') decide('switch', true); else promote(g.idea);
    return;
  }
  guard.stage = 'ask';
  renderGuard();
}

function renderGuard() {
  // the capture it was asked for is gone (answered from another surface)
  if (guard && guard.kind === 'switch' && !state.pending) guard = null;
  if (guard && guard.kind === 'promote' && !state.queue.includes(guard.idea)) guard = null;
  $('guard').hidden = !guard;
  $('decision').classList.toggle('guarded', !!guard && guard.kind === 'switch');
  if (!guard) return;
  const focus = { focus: state.focus || '' };
  $('guard').classList.toggle('checking', guard.stage === 'checking');
  $('guardQ').textContent = guard.stage === 'checking' ? airlockT('guardChecking')
    : guard.stage === 'ask' ? airlockT('guardQuestion', focus)
    : airlockT('guardInsist', focus);
  $('guardAsk').hidden = guard.stage !== 'ask';
  $('guardInsist').hidden = guard.stage !== 'insist';
  $('guardDrop').hidden = guard.kind !== 'switch';
  $('guardQueueLabel').textContent = airlockT(guard.kind === 'switch' ? 'btnQueue' : 'guardKeep');
  $('guardHint').textContent = guard.stage === 'ask' ? airlockT('guardHint')
    : guard.stage === 'insist' && guard.kind === 'switch' ? airlockT('guardInsistHint') : '';
}

// Yes: the focus is archived as done (undoable) and the new idea takes over.
function guardYes() {
  const g = guard;
  guard = null;
  const finished = state.focus;
  withUndo(airlockT('toastDone', { text: finished }), () => {
    state.done.push({ text: finished, at: Date.now() });
    if (state.done.length > AIRLOCK_DONE_MAX) state.done = state.done.slice(-AIRLOCK_DONE_MAX);
    if (g.kind === 'switch') {
      state.focus = state.pending;
      state.pending = null;
    } else {
      const i = state.queue.indexOf(g.idea);
      if (i !== -1) state.queue.splice(i, 1);
      state.focus = g.idea;
    }
  });
  $('input').focus();
}

function guardNo() {
  guard.stage = 'insist';
  renderGuard();
}

// Park the new idea (switch) or leave it where it is (→ from the queue).
function guardKeep() {
  const g = guard;
  guard = null;
  if (g.kind === 'switch') decide('queue'); else render();
}

function guardDrop() {
  guard = null;
  decide('drop');
}

// The quieter way out, counted locally and only ever shown on the Options page.
function guardAnyway() {
  const g = guard;
  guard = null;
  chrome.storage.local.get([AIRLOCK_GUARD_KEY], r => {
    const cur = airlockGuardSettings(r[AIRLOCK_GUARD_KEY]);
    chrome.storage.local.set({ [AIRLOCK_GUARD_KEY]: { ...cur, bypasses: cur.bypasses + 1 } });
  });
  if (g.kind === 'switch') decide('switch', true); else promote(g.idea);
}

function cancelGuard() {
  guard = null;
  render();
  $('input').focus();
}

$('guardYes').onclick = guardYes;
$('guardNo').onclick = guardNo;
$('guardQueue').onclick = guardKeep;
$('guardDrop').onclick = guardDrop;
$('guardAnyway').onclick = guardAnyway;

chrome.storage.local.get([AIRLOCK_GUARD_KEY], r => {
  guardSettings = airlockGuardSettings(r[AIRLOCK_GUARD_KEY]);
  prepareGuard();
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes[AIRLOCK_GUARD_KEY]) return;
  guardSettings = airlockGuardSettings(changes[AIRLOCK_GUARD_KEY].newValue);
  prepareGuard();
});

// ─── event handlers ─────────────────────────────────────────────────────

$('btnAdd').onclick = capture;
$('input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); capture(); }
});

$('btnGo').onclick = () => decide('switch');
$('btnQueue').onclick = () => decide('queue');
$('btnDrop').onclick = () => decide('drop');
$('btnDone').onclick = markDone;
$('btnUndo').onclick = undo;

// Keyboard-first: the whole capture → decide loop works without the mouse.
document.addEventListener('keydown', e => {
  // in the wide view, a key typed in any other field is just text
  if (WIDE && e.target !== $('input') && e.target.matches('input, textarea, select, [contenteditable]')) return;
  const typing = e.target === $('input') && $('input').value !== '';
  if (guard && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
    if (e.key === 'Escape') { e.preventDefault(); cancelGuard(); return; }
    const act = guard.stage === 'ask' ? { '1': guardYes, '2': guardNo }[e.key]
      : guard.stage === 'insist' ? { '2': guardKeep, '3': guard.kind === 'switch' ? guardDrop : null }[e.key]
      : null;
    if (act) { e.preventDefault(); act(); return; }
    if (/^[123]$/.test(e.key)) { e.preventDefault(); return; }   // no 1/2/3 behind the guard's back
  }
  if (state.pending && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const kind = { '1': 'switch', '2': 'queue', '3': 'drop' }[e.key];
    if (kind) { e.preventDefault(); decide(kind); return; }
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && undoSnapshot && !typing) {
    e.preventDefault();
    undo();
  }
});

$('queue').addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const i = parseInt(btn.dataset.i, 10);
  const act = btn.dataset.act;
  if (!(i >= 0 && i < state.queue.length)) return;
  if (act === 'del') {
    const item = state.queue[i];
    withUndo(airlockT('toastRemoved', { text: item }), () => { state.queue.splice(i, 1); });
    return;
  }
  if (act === 'up' && i > 0) {
    [state.queue[i-1], state.queue[i]] = [state.queue[i], state.queue[i-1]];
  } else if (act === 'focus') {
    if (guardWanted()) startGuard({ kind: 'promote', idea: state.queue[i] });
    else promote(state.queue[i]);
    return;
  }
  save(); render();
});

// Opens the step-breakdown view in a tab, on the current focus if there is one
$('btnMethod').onclick = () => {
  const url = state.focus
    ? `pages/methodology.html?impulse=${encodeURIComponent(state.focus)}`
    : 'pages/methodology.html';
  chrome.tabs.create({ url: chrome.runtime.getURL(url) });
};

// One wide view at most: an open one is brought to the front. getContexts
// needs no "tabs" permission, unlike tabs.query on a URL.
async function openWide() {
  const url = chrome.runtime.getURL('pages/wide.html');
  const [ctx] = await chrome.runtime.getContexts({ contextTypes: ['TAB'], documentUrls: [url] });
  if (ctx && ctx.tabId >= 0) {
    await chrome.tabs.update(ctx.tabId, { active: true });
    if (ctx.windowId >= 0) await chrome.windows.update(ctx.windowId, { focused: true });
    return;
  }
  chrome.tabs.create({ url });
}
$('btnAbout').onclick = () => chrome.tabs.create({ url: chrome.runtime.getURL('pages/about.html') });
$('queueMore').onclick = openWide;
$('btnWide').onclick = openWide;

$('btnReset').onclick = () => {
  if (confirm(airlockT('resetConfirm'))) {
    withUndo(airlockT('toastReset'), () => { state = airlockBlank(); });
  }
};

load();
airlockShortcut(s => { shortcut = s; if (loaded) render(); });
// static labels are translated by i18n.js; the dynamic ones need a re-render
airlockI18nInit(() => { renderLangPicker(); if (loaded) render(); });
renderLangPicker();
