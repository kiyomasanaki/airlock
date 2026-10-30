// Airlock - shared state helpers.
//
// Loaded before its own script by every surface (popup, options, methodology,
// content script, service worker via importScripts). Plain globals on purpose:
// no modules, no build step.
//
// Shape of `airlock_state`:
//   focus:         string | null
//   queue:         string[]
//   done:          { text: string, at: number|null }[]   (older versions: string[])
//   pending:       string | null    captured impulse still waiting for a decision
//   methodologies: { [impulseText]: { steps: { text, done }[], generatedAt?, updatedAt? } }

const AIRLOCK_KEY = 'airlock_state';
const AIRLOCK_DONE_MAX = 1000;      // full history lives on the Options page

function airlockBlank() {
  return { focus: null, queue: [], done: [], pending: null, methodologies: {} };
}

// Accepts any stored or imported shape and returns a well-formed state.
// Never throws: a corrupted field falls back to its empty value.
function airlockNormalize(raw) {
  const s = Object.assign(airlockBlank(), raw && typeof raw === 'object' ? raw : {});

  if (typeof s.focus !== 'string' || !s.focus.trim()) s.focus = null;
  if (typeof s.pending !== 'string' || !s.pending.trim()) s.pending = null;
  s.queue = Array.isArray(s.queue) ? s.queue.filter(x => typeof x === 'string' && x.trim()) : [];

  s.done = (Array.isArray(s.done) ? s.done : [])
    .map(d => typeof d === 'string' ? { text: d, at: null } : d)
    .filter(d => d && typeof d.text === 'string')
    .map(d => ({ text: d.text, at: typeof d.at === 'number' ? d.at : null }))
    .slice(-AIRLOCK_DONE_MAX);

  const m = s.methodologies;
  s.methodologies = {};
  if (m && typeof m === 'object' && !Array.isArray(m)) {
    Object.keys(m).forEach(k => {
      const v = m[k];
      if (!v || !Array.isArray(v.steps)) return;
      const steps = v.steps
        .filter(st => st && typeof st.text === 'string' && st.text.trim())
        .map(st => ({ text: st.text, done: !!st.done }));
      if (!steps.length) return;
      const out = { steps };
      if (typeof v.generatedAt === 'number') out.generatedAt = v.generatedAt;
      if (typeof v.updatedAt === 'number') out.updatedAt = v.updatedAt;
      s.methodologies[k] = out;
    });
  }
  return s;
}

// First unticked step of an impulse's methodology, or null.
function airlockNextStep(state, text) {
  const m = text && state.methodologies && state.methodologies[text];
  if (!m || !Array.isArray(m.steps)) return null;
  const step = m.steps.find(st => !st.done);
  return step ? step.text : null;
}

// Read-modify-write on fresh storage, so two open surfaces never overwrite
// each other's changes with a stale copy.
function airlockMutate(fn, cb) {
  chrome.storage.local.get([AIRLOCK_KEY], r => {
    const s = airlockNormalize(r[AIRLOCK_KEY]);
    fn(s);
    chrome.storage.local.set({ [AIRLOCK_KEY]: s }, () => cb && cb(s));
  });
}
