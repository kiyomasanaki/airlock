// Airlock - service worker.
//
// Two small jobs, no state of its own:
//  1. Keep the toolbar icon informative: its tooltip shows the current focus and
//     next step from any tab, and a "?" badge flags a capture still waiting for a
//     switch/queue/drop answer (the popup was closed before deciding).
//  2. Keep the optional "reminder on every site" content script registered
//     exactly when the user has granted the matching host permission.

importScripts('state.js');

const EVERYWHERE_ID = 'airlock-everywhere';
const EVERYWHERE_ORIGINS = ['https://*/*', 'http://*/*'];

// ─── toolbar icon ───────────────────────────────────────────────────────

function refreshAction(raw) {
  const s = airlockNormalize(raw);
  const lines = [];

  if (s.focus) {
    lines.push(`Focus : ${s.focus}`);
    const next = airlockNextStep(s, s.focus);
    if (next) lines.push(`Prochaine étape : ${next}`);
    lines.push(s.queue.length ? `${s.queue.length} en file` : 'file vide');
  } else {
    lines.push('Aucun focus — clique ou Ctrl+Shift+Q pour capturer');
  }
  if (s.pending) lines.push(`En attente de décision : ${s.pending}`);

  chrome.action.setTitle({ title: 'Airlock\n' + lines.join('\n') });
  chrome.action.setBadgeBackgroundColor({ color: '#f2b53c' });
  chrome.action.setBadgeText({ text: s.pending ? '?' : '' });
}

function refreshFromStorage() {
  chrome.storage.local.get([AIRLOCK_KEY], r => refreshAction(r[AIRLOCK_KEY]));
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[AIRLOCK_KEY]) refreshAction(changes[AIRLOCK_KEY].newValue);
});

// ─── optional reminder on every site ────────────────────────────────────

async function syncEverywhere() {
  try {
    const granted = await chrome.permissions.contains({ origins: EVERYWHERE_ORIGINS });
    const existing = await chrome.scripting.getRegisteredContentScripts({ ids: [EVERYWHERE_ID] });
    if (granted && !existing.length) {
      await chrome.scripting.registerContentScripts([{
        id: EVERYWHERE_ID,
        matches: EVERYWHERE_ORIGINS,
        excludeMatches: ['https://claude.ai/*'],   // already covered by the static script
        js: ['js/state.js', 'js/content.js'],
        css: ['css/content.css'],
        runAt: 'document_idle',
      }]);
    } else if (!granted && existing.length) {
      await chrome.scripting.unregisterContentScripts({ ids: [EVERYWHERE_ID] });
    }
  } catch (e) {
    console.warn('Airlock: could not sync the everywhere reminder', e);
  }
}

chrome.permissions.onAdded.addListener(syncEverywhere);
chrome.permissions.onRemoved.addListener(syncEverywhere);

// The options page asks for a sync after toggling, and waits for it so its own
// UI reflects the real registration state.
chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg && msg.type === 'airlock_sync_everywhere') {
    syncEverywhere().then(() => reply({ ok: true }));
    return true;
  }
});

// ─── startup ────────────────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(() => { refreshFromStorage(); syncEverywhere(); });
chrome.runtime.onStartup.addListener(() => { refreshFromStorage(); syncEverywhere(); });
