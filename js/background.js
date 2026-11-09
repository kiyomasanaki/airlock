// Airlock - service worker.
//
// Two small jobs, no state of its own:
//  1. Keep the toolbar icon informative: its tooltip shows the current focus and
//     next step from any tab, and a "?" badge flags a capture still waiting for a
//     switch/queue/drop answer (the popup was closed before deciding).
//  2. Keep the optional "reminder on every site" content script registered
//     exactly when the user has granted the matching host permission.

importScripts('state.js', 'i18n.js');

const EVERYWHERE_ID = 'airlock-everywhere';
const EVERYWHERE_ORIGINS = ['https://*/*', 'http://*/*'];
const EVERYWHERE_JS = ['js/state.js', 'js/i18n.js', 'js/content.js'];

// ─── toolbar icon ───────────────────────────────────────────────────────

// There is no chrome.commands.onChanged: the shortcut is re-read whenever the
// icon is refreshed (install, startup, any data change, Options page opened).
// A "!" badge flags an unbound shortcut, unless the user chose to ignore it.
function refreshAction(raw, dismissed, lang) {
  const s = airlockNormalize(raw);
  airlockSetLang(lang);
  airlockShortcut(shortcut => {
    const lines = [];
    const warnShortcut = !shortcut && !dismissed;

    if (s.focus) {
      lines.push(airlockT('tipFocus', { focus: s.focus }));
      const next = airlockNextStep(s, s.focus);
      if (next) lines.push(airlockT('tipNext', { next }));
      lines.push(s.queue.length ? airlockT('queueCount', s.queue.length) : airlockT('queueEmpty'));
    } else {
      lines.push(shortcut
        ? airlockT('tipNoFocusShortcut', { shortcut })
        : airlockT('tipNoFocus'));
    }
    if (s.pending) lines.push(airlockT('tipPending', { pending: s.pending }));
    if (warnShortcut) {
      lines.push(airlockT('tipNoShortcut'));
    }

    chrome.action.setTitle({ title: 'Airlock\n' + lines.join('\n') });
    // a capture waiting for its answer comes first: it is the core loop
    chrome.action.setBadgeBackgroundColor({ color: s.pending ? '#f2b53c' : '#e5484d' });
    chrome.action.setBadgeText({ text: s.pending ? '?' : warnShortcut ? '!' : '' });
  });
}

function refreshFromStorage() {
  chrome.storage.local.get([AIRLOCK_KEY, AIRLOCK_SHORTCUT_DISMISSED_KEY, AIRLOCK_LANG_KEY],
    r => refreshAction(r[AIRLOCK_KEY], !!r[AIRLOCK_SHORTCUT_DISMISSED_KEY], r[AIRLOCK_LANG_KEY]));
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes[AIRLOCK_KEY] || changes[AIRLOCK_SHORTCUT_DISMISSED_KEY] || changes[AIRLOCK_LANG_KEY])) {
    refreshFromStorage();
  }
});

// ─── optional reminder on every site ────────────────────────────────────

// Install, startup, permission events and the Options page can all ask at once:
// two overlapping runs would both see "not registered" and the second
// registration would fail on the duplicate id. Runs are chained, never parallel.
let syncChain = Promise.resolve();

function syncEverywhere() {
  syncChain = syncChain.then(doSyncEverywhere);
  return syncChain;
}

async function doSyncEverywhere() {
  try {
    const granted = await chrome.permissions.contains({ origins: EVERYWHERE_ORIGINS });
    const existing = await chrome.scripting.getRegisteredContentScripts({ ids: [EVERYWHERE_ID] });
    if (granted && !existing.length) {
      await chrome.scripting.registerContentScripts([{
        id: EVERYWHERE_ID,
        matches: EVERYWHERE_ORIGINS,
        excludeMatches: ['https://claude.ai/*'],   // already covered by the static script
        js: EVERYWHERE_JS,
        css: ['css/content.css'],
        runAt: 'document_idle',
      }]);
    } else if (granted && existing[0].js.join() !== EVERYWHERE_JS.join()) {
      // registered by an older version with another script list (1.3.0 added i18n.js)
      await chrome.scripting.updateContentScripts([{ id: EVERYWHERE_ID, js: EVERYWHERE_JS }]);
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
  // content scripts have no chrome.commands (see airlockShortcut in state.js)
  if (msg && msg.type === 'airlock_shortcut') {
    airlockShortcut(shortcut => reply({ shortcut }));
    return true;
  }
  // a web page cannot open chrome:// URLs itself (shortcut warning, content.js)
  if (msg && msg.type === 'airlock_open_shortcuts') {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  }
  // the Options page re-checks the shortcut each time it is opened
  if (msg && msg.type === 'airlock_check_shortcut') refreshFromStorage();
});

// ─── startup ────────────────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(details => {
  refreshFromStorage();
  syncEverywhere();
  // Chrome only binds the suggested key at install, and skips it on conflict.
  // Say so once, right away; later, only the badge remains.
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    airlockShortcut(shortcut => { if (!shortcut) chrome.runtime.openOptionsPage(); });
  }
});
chrome.runtime.onStartup.addListener(() => { refreshFromStorage(); syncEverywhere(); });
