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

// There is no chrome.commands.onChanged: the shortcut is re-read whenever the
// icon is refreshed (install, startup, any data change, Options page opened).
// A "!" badge flags an unbound shortcut, unless the user chose to ignore it.
function refreshAction(raw, dismissed) {
  const s = airlockNormalize(raw);
  airlockShortcut(shortcut => {
    const lines = [];
    const warnShortcut = !shortcut && !dismissed;

    if (s.focus) {
      lines.push(`Focus : ${s.focus}`);
      const next = airlockNextStep(s, s.focus);
      if (next) lines.push(`Prochaine étape : ${next}`);
      lines.push(s.queue.length ? `${s.queue.length} en file` : 'file vide');
    } else {
      lines.push(shortcut
        ? `Aucun focus : clique ou ${shortcut} pour capturer`
        : 'Aucun focus : clique pour capturer');
    }
    if (s.pending) lines.push(`En attente de décision : ${s.pending}`);
    if (warnShortcut) {
      lines.push('Raccourci clavier non assigné (déjà pris par Chrome, une autre extension ou une application) : choisis-en un dans les Options');
    }

    chrome.action.setTitle({ title: 'Airlock\n' + lines.join('\n') });
    // a capture waiting for its answer comes first: it is the core loop
    chrome.action.setBadgeBackgroundColor({ color: s.pending ? '#f2b53c' : '#e5484d' });
    chrome.action.setBadgeText({ text: s.pending ? '?' : warnShortcut ? '!' : '' });
  });
}

function refreshFromStorage() {
  chrome.storage.local.get([AIRLOCK_KEY, AIRLOCK_SHORTCUT_DISMISSED_KEY],
    r => refreshAction(r[AIRLOCK_KEY], !!r[AIRLOCK_SHORTCUT_DISMISSED_KEY]));
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes[AIRLOCK_KEY] || changes[AIRLOCK_SHORTCUT_DISMISSED_KEY])) {
    refreshFromStorage();
  }
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
