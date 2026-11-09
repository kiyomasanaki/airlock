// Airlock - interface language, switchable live.
//
// chrome.i18n follows Chrome's own UI language and cannot be changed at
// runtime, so the interface uses this small dictionary instead (chrome.i18n
// only localises the manifest: name, description, shortcut label).
//
// Loaded right after js/state.js by every surface. The choice lives in
// chrome.storage.local under `airlock_lang` ('auto' | 'fr' | 'en'), a UI
// preference like `airlock_ui`: never exported. Every surface listens to
// chrome.storage.onChanged and re-renders, so a change in the Options page
// reaches the popup, the reminder card and the toolbar tooltip without a reload.
//
// Values are strings with {placeholders}, or functions when wording depends on
// a number. Strings used with data-i18n-html are trusted markup from this file
// only: user data always goes through textContent.

const AIRLOCK_LANG_KEY = 'airlock_lang';
const AIRLOCK_LANGS = ['fr', 'en'];
// cached in the extension's own localStorage so pages paint in the right
// language at once (same trick as js/theme.js); never the web page's storage
const AIRLOCK_LANG_CACHE = 'airlock_lang_resolved';
const AIRLOCK_EXT_PAGE = typeof location !== 'undefined' && location.protocol === 'chrome-extension:'
  && typeof document !== 'undefined';

const AIRLOCK_STRINGS = {
  fr: {
    // shared
    queueCount: n => `${n} en file`,
    queueEmpty: 'file vide',
    nextStep: 'prochaine étape',
    currentFocus: 'focus actuel',

    // popup
    themeToggleTitle: 'thème clair / sombre',
    themeToggleAria: 'basculer le thème',
    focusEmpty: 'aucun, tape ci-dessous',
    doneTitle: 'terminé : le suivant de la file prend la place',
    doneAria: 'marquer le focus comme terminé',
    capturePlaceholder: 'capture l\'impulsion...',
    captureAria: 'capturer une impulsion',
    captureBtn: 'capturer',
    hintEnter: 'Entrée pour valider',
    hintEnterShortcut: 'Entrée pour valider · {shortcut} pour rouvrir',
    hintDecision: '1 switch · 2 file · 3 laisser tomber',
    nextStepLabel: 'prochaine étape :',
    decisionAhead: 'ça passe devant "{focus}" ?',
    decisionNoFocus: 'aucun focus en cours : 1 pour en faire ton focus',
    btnSwitch: 'je switch',
    btnQueue: 'file d\'attente',
    btnDrop: 'laisser tomber',
    queueTitle: 'file de priorités',
    queueEmptyPopup: 'vide, bonne concentration',
    toFocus: 'passer en focus',
    moveUp: 'monter',
    remove: 'supprimer',
    doneToday: 'fait aujourd\'hui',
    undo: 'annuler',
    methodBtn: 'découper en étapes',
    methodTitle: 'découper le focus en petites étapes concrètes',
    resetBtn: 'tout vider',
    resetConfirm: 'Vider focus, file, historique et étapes ?',
    toastDropped: 'laissé tomber, c\'est très bien',
    toastDone: 'terminé : {text}',
    toastRemoved: 'supprimé : {text}',
    toastReset: 'tout a été vidé',

    // toolbar tooltip
    tipFocus: 'Focus : {focus}',
    tipNext: 'Prochaine étape : {next}',
    tipNoFocusShortcut: 'Aucun focus : clique ou {shortcut} pour capturer',
    tipNoFocus: 'Aucun focus : clique pour capturer',
    tipPending: 'En attente de décision : {pending}',
    tipNoShortcut: 'Raccourci clavier non assigné (déjà pris par Chrome, une autre extension ou une application) : choisis-en un dans les Options',

    // reminder card and shortcut warning (content script)
    cardAria: 'Airlock : focus actuel',
    cardNoFocus: 'aucun focus défini',
    cardHide: 'Masquer',
    cardHideShortcut: 'Masquer ({shortcut} pour rouvrir Airlock)',
    cardHideAria: 'Masquer le rappel Airlock',
    cardNothing: 'Rien en cours',
    cardNudge: 'Capture ton intention dans le sas avant de plonger dans une nouvelle conversation.',
    cardClickIcon: 'clique l\'icône Airlock',
    warnRebound: 'Ce n\'est plus le raccourci d\'Airlock',
    warnUnbound: 'Le raccourci Airlock n\'est pas actif',
    warnReboundText: '{suggested} n\'ouvre plus Airlock : le raccourci actuel est {bound}.',
    warnUnboundText: '{suggested} n\'est relié à aucune action. Une autre extension ou application l\'utilise peut-être : choisis un raccourci libre dans les réglages de Chrome.',
    warnOk: 'L\'extension fonctionne, seul le raccourci est à régler.',
    warnBtn: 'Vérifier les raccourcis',
    close: 'Fermer',

    // options
    optTitle: 'Airlock · Options',
    optSubtitle: 'Réglages et données. Le popup reste volontairement minimal : tout le reste est ici.',
    optLangTitle: 'Langue',
    optLangDesc: 'Langue de l\'interface : popup, carte de rappel, étapes et infobulle de l\'icône. Le changement s\'applique tout de suite, sans recharger.',
    optLangAuto: 'Automatique (langue du navigateur)',
    optShortcutTitle: 'Raccourci clavier',
    optShortcutDesc: 'Raccourci actuel : <kbd id="currentShortcut">…</kbd>. Pour le modifier, ça se passe dans les réglages d\'extensions de Chrome. Dans le sas, <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> répondent switch / file / laisser tomber sans la souris.',
    optShortcutWarning: '<b>Aucun raccourci n\'est assigné à Airlock.</b> Chrome n\'a pas pu lui donner <kbd id="suggestedShortcut">…</kbd> : la combinaison est sans doute déjà prise par Chrome, une autre extension ou une application. Choisis une combinaison libre avec le bouton ci-dessous. L\'extension fonctionne : en attendant, un clic sur son icône ouvre le sas.',
    optShortcutDismiss: 'Ne plus afficher l\'alerte (badge « ! » sur l\'icône)',
    optShortcutBtn: 'Ouvrir chrome://extensions/shortcuts',
    optShortcutNone: 'aucun (à définir)',
    optEverywhereTitle: 'Rappel du focus sur tous les sites',
    optEverywhereDesc: 'Par défaut, la carte qui rappelle ton focus n\'apparaît que sur claude.ai. Active-la partout pour la retrouver là où l\'attention s\'échappe vraiment : mails, réseaux, vidéos, recherche. Elle n\'apparaît que si un focus est défini, se ferme d\'un clic, et ne lit jamais le contenu des pages. Chrome te demandera l\'accès aux sites : c\'est ce qui permet d\'afficher la carte, rien d\'autre.',
    optOn: 'activé',
    optOff: 'désactivé',
    optEverywhereEnable: 'Activer sur tous les sites',
    optEverywhereDisable: 'Désactiver',
    optEverywhereOff: 'Rappel limité à claude.ai.',
    optEverywhereDenied: 'Permission non accordée : rien n\'a changé.',
    optEverywhereOnMsg: 'Activé. Le rappel apparaît sur les pages que tu ouvres ou recharges à partir de maintenant.',
    optDataTitle: 'Export / Import',
    optDataDesc: 'Tes données restent 100% locales. L\'export (focus, file, historique daté, étapes) sert de sauvegarde ou de transfert manuel vers une autre machine.',
    optExport: 'Exporter en JSON',
    optImport: 'Importer un JSON',
    optExported: 'Export téléchargé.',
    optBadJson: 'Fichier invalide : JSON illisible.',
    optBadShape: 'Fichier invalide : structure inattendue.',
    optImportConfirm: 'Remplacer les données actuelles (focus, file, historique, étapes) par le contenu de ce fichier ?',
    optImported: 'Import réussi.',
    optHistoryTitle: 'Historique complet : fait',
    optHistoryEmpty: 'rien de fait pour l\'instant',
    optFooter: 'Airlock : stockage 100% local, aucun serveur, aucune télémétrie.',
    loading: 'chargement…',
    dayUnknown: 'date inconnue',
    dayToday: 'aujourd\'hui',
    dayYesterday: 'hier',

    // step breakdown
    mTitle: 'Airlock · Étapes',
    mImpulses: 'Impulsions',
    mGroupFocus: 'Focus actuel',
    mGroupQueue: 'File de priorités',
    mGroupDone: 'Fait',
    mEmptyShortcut: 'aucune impulsion : capture-en une avec {shortcut}',
    mEmpty: 'aucune impulsion : capture-en une depuis l\'icône Airlock',
    mFirstPlaceholder: 'la toute première action, faisable en moins de 10 minutes…',
    mNextPlaceholder: 'étape suivante…',
    mAddAria: 'ajouter une étape',
    mAdd: 'Ajouter',
    mPickTitle: 'Choisis une impulsion',
    mPickBody: 'Sélectionne une impulsion à gauche pour la découper en petites étapes concrètes.',
    mGeneratedAt: 'Étapes générées le {date}',
    mGenerating: 'Génération…',
    mRegenerate: 'Regénérer avec Claude',
    mGenerate: 'Générer avec Claude',
    mGenerateTitle: 'Optionnel : nécessite Claude Code et l\'hôte natif Airlock installés sur cette machine',
    mClear: 'Tout effacer',
    mClearConfirm: 'Effacer toutes les étapes de cette impulsion ?',
    mBusyTitle: 'Génération en cours…',
    mBusyBody: 'Claude construit la marche à suivre. Ça prend quelques secondes.',
    mStartTitle: 'Par quoi commencer ?',
    mStartBody: 'Écris la toute première action concrète, si petite qu\'elle paraît ridicule. Démarrer est le plus dur, le reste suit.',
    mProgress: (done, total) => `${done} étape${done > 1 ? 's' : ''} sur ${total}`,
    mTick: 'Marquer l\'étape {n} comme faite',
    mUntick: 'Marquer l\'étape {n} comme non faite',
    mDelTitle: 'Supprimer cette étape',
    mDelAria: 'Supprimer l\'étape {n}',
    mRegenConfirm: 'Remplacer les étapes actuelles par une nouvelle génération ?',
    mErrPermTitle: 'Permission refusée',
    mErrPermBody: 'La génération par Claude a besoin d\'échanger avec un programme installé sur ta machine. Tu peux continuer à écrire tes étapes à la main.',
    mErrHostTitle: 'Hôte natif introuvable',
    mErrHostBody: 'Chrome n\'a pas pu joindre l\'hôte qui exécute `claude -p`. Cette option demande Claude Code et l\'hôte natif Airlock installés sur cette machine. Les étapes manuelles fonctionnent sans.',
    mErrFailTitle: 'La génération a échoué',
    mErrFailBody: 'L\'hôte natif a répondu avec une erreur.',
    mErrEmpty: 'réponse vide',
    mErrParseTitle: 'Réponse illisible',
    mErrParseBody: 'Le modèle n\'a pas renvoyé le JSON attendu. Relance la génération.',
    mPrompt: impulse => [
      'Tu aides quelqu\'un qui a un TDAH ou un fort pattern de context-switching : il capture une intention de travail et a besoin de savoir par où commencer, tout de suite.',
      '',
      `Intention : « ${impulse} »`,
      '',
      'Produis une méthodologie de 4 à 8 étapes numérotées pour la mener à terme.',
      'Contraintes :',
      '- chaque étape est une action concrète, commençable immédiatement, pas un conseil vague',
      '- la première étape doit pouvoir être faite en moins de 10 minutes',
      '- une phrase par étape, pas de sous-listes',
      '- réponds en français',
      '',
      'Réponds UNIQUEMENT par du JSON valide, sans texte autour, sans bloc de code, à ce format exact :',
      '{"steps":["première étape","deuxième étape"]}',
    ].join('\n'),
  },

  en: {
    queueCount: n => `${n} queued`,
    queueEmpty: 'queue empty',
    nextStep: 'next step',
    currentFocus: 'current focus',

    themeToggleTitle: 'light / dark theme',
    themeToggleAria: 'toggle theme',
    focusEmpty: 'none, type below',
    doneTitle: 'done: the next one in the queue takes its place',
    doneAria: 'mark the focus as done',
    capturePlaceholder: 'capture the impulse...',
    captureAria: 'capture an impulse',
    captureBtn: 'capture',
    hintEnter: 'Enter to confirm',
    hintEnterShortcut: 'Enter to confirm · {shortcut} to reopen',
    hintDecision: '1 switch · 2 queue · 3 drop',
    nextStepLabel: 'next step:',
    decisionAhead: 'does it go ahead of "{focus}"?',
    decisionNoFocus: 'no focus running: 1 to make it your focus',
    btnSwitch: 'switch',
    btnQueue: 'queue',
    btnDrop: 'drop',
    queueTitle: 'priority queue',
    queueEmptyPopup: 'empty, stay focused',
    toFocus: 'make it the focus',
    moveUp: 'move up',
    remove: 'delete',
    doneToday: 'done today',
    undo: 'undo',
    methodBtn: 'break into steps',
    methodTitle: 'break the focus into small concrete steps',
    resetBtn: 'clear all',
    resetConfirm: 'Clear focus, queue, history and steps?',
    toastDropped: 'dropped, and that is fine',
    toastDone: 'done: {text}',
    toastRemoved: 'deleted: {text}',
    toastReset: 'everything was cleared',

    tipFocus: 'Focus: {focus}',
    tipNext: 'Next step: {next}',
    tipNoFocusShortcut: 'No focus: click or press {shortcut} to capture',
    tipNoFocus: 'No focus: click to capture',
    tipPending: 'Waiting for a decision: {pending}',
    tipNoShortcut: 'No keyboard shortcut assigned (already taken by Chrome, another extension or an app): pick one in the Options',

    cardAria: 'Airlock: current focus',
    cardNoFocus: 'no focus set',
    cardHide: 'Hide',
    cardHideShortcut: 'Hide ({shortcut} to reopen Airlock)',
    cardHideAria: 'Hide the Airlock reminder',
    cardNothing: 'Nothing running',
    cardNudge: 'Capture your intention in the airlock before diving into a new conversation.',
    cardClickIcon: 'click the Airlock icon',
    warnRebound: 'This is no longer Airlock\'s shortcut',
    warnUnbound: 'The Airlock shortcut is not active',
    warnReboundText: '{suggested} no longer opens Airlock: the current shortcut is {bound}.',
    warnUnboundText: '{suggested} is not bound to anything. Another extension or app may be using it: pick a free shortcut in Chrome\'s settings.',
    warnOk: 'The extension works, only the shortcut needs setting.',
    warnBtn: 'Check shortcuts',
    close: 'Close',

    optTitle: 'Airlock · Options',
    optSubtitle: 'Settings and data. The popup stays minimal on purpose: everything else is here.',
    optLangTitle: 'Language',
    optLangDesc: 'Interface language: popup, reminder card, steps and icon tooltip. The change applies right away, no reload.',
    optLangAuto: 'Automatic (browser language)',
    optShortcutTitle: 'Keyboard shortcut',
    optShortcutDesc: 'Current shortcut: <kbd id="currentShortcut">…</kbd>. To change it, use Chrome\'s extension settings. In the airlock, <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> answer switch / queue / drop without the mouse.',
    optShortcutWarning: '<b>No shortcut is assigned to Airlock.</b> Chrome could not give it <kbd id="suggestedShortcut">…</kbd>: the combination is probably already taken by Chrome, another extension or an app. Pick a free combination with the button below. The extension works: meanwhile, clicking its icon opens the airlock.',
    optShortcutDismiss: 'Stop showing the alert ("!" badge on the icon)',
    optShortcutBtn: 'Open chrome://extensions/shortcuts',
    optShortcutNone: 'none (to set)',
    optEverywhereTitle: 'Focus reminder on every site',
    optEverywhereDesc: 'By default, the card that reminds you of your focus only appears on claude.ai. Turn it on everywhere to find it where attention really slips away: email, social media, videos, search. It only appears when a focus is set, closes in one click, and never reads page content. Chrome will ask for access to sites: that is what lets the card show, nothing else.',
    optOn: 'on',
    optOff: 'off',
    optEverywhereEnable: 'Turn on for every site',
    optEverywhereDisable: 'Turn off',
    optEverywhereOff: 'Reminder limited to claude.ai.',
    optEverywhereDenied: 'Permission not granted: nothing changed.',
    optEverywhereOnMsg: 'On. The reminder appears on pages you open or reload from now on.',
    optDataTitle: 'Export / Import',
    optDataDesc: 'Your data stays 100% local. The export (focus, queue, dated history, steps) is for backup or manual transfer to another machine.',
    optExport: 'Export as JSON',
    optImport: 'Import a JSON file',
    optExported: 'Export downloaded.',
    optBadJson: 'Invalid file: unreadable JSON.',
    optBadShape: 'Invalid file: unexpected structure.',
    optImportConfirm: 'Replace the current data (focus, queue, history, steps) with the content of this file?',
    optImported: 'Import successful.',
    optHistoryTitle: 'Full history: done',
    optHistoryEmpty: 'nothing done yet',
    optFooter: 'Airlock: 100% local storage, no server, no telemetry.',
    loading: 'loading…',
    dayUnknown: 'unknown date',
    dayToday: 'today',
    dayYesterday: 'yesterday',

    mTitle: 'Airlock · Steps',
    mImpulses: 'Impulses',
    mGroupFocus: 'Current focus',
    mGroupQueue: 'Priority queue',
    mGroupDone: 'Done',
    mEmptyShortcut: 'no impulse: capture one with {shortcut}',
    mEmpty: 'no impulse: capture one from the Airlock icon',
    mFirstPlaceholder: 'the very first action, doable in under 10 minutes…',
    mNextPlaceholder: 'next step…',
    mAddAria: 'add a step',
    mAdd: 'Add',
    mPickTitle: 'Pick an impulse',
    mPickBody: 'Select an impulse on the left to break it into small concrete steps.',
    mGeneratedAt: 'Steps generated on {date}',
    mGenerating: 'Generating…',
    mRegenerate: 'Regenerate with Claude',
    mGenerate: 'Generate with Claude',
    mGenerateTitle: 'Optional: requires Claude Code and the Airlock native host installed on this machine',
    mClear: 'Clear all',
    mClearConfirm: 'Clear all the steps of this impulse?',
    mBusyTitle: 'Generating…',
    mBusyBody: 'Claude is building the plan. It takes a few seconds.',
    mStartTitle: 'Where to start?',
    mStartBody: 'Write the very first concrete action, so small it feels silly. Starting is the hardest part, the rest follows.',
    mProgress: (done, total) => `${done} of ${total} step${total > 1 ? 's' : ''} done`,
    mTick: 'Mark step {n} as done',
    mUntick: 'Mark step {n} as not done',
    mDelTitle: 'Delete this step',
    mDelAria: 'Delete step {n}',
    mRegenConfirm: 'Replace the current steps with a new generation?',
    mErrPermTitle: 'Permission denied',
    mErrPermBody: 'Generating with Claude needs to talk to a program installed on your machine. You can keep writing your steps by hand.',
    mErrHostTitle: 'Native host not found',
    mErrHostBody: 'Chrome could not reach the host that runs `claude -p`. This option requires Claude Code and the Airlock native host installed on this machine. Manual steps work without it.',
    mErrFailTitle: 'Generation failed',
    mErrFailBody: 'The native host answered with an error.',
    mErrEmpty: 'empty response',
    mErrParseTitle: 'Unreadable response',
    mErrParseBody: 'The model did not return the expected JSON. Run the generation again.',
    mPrompt: impulse => [
      'You are helping someone with ADHD or a strong context-switching pattern: they capture a work intention and need to know where to start, right now.',
      '',
      `Intention: "${impulse}"`,
      '',
      'Produce a methodology of 4 to 8 numbered steps to see it through.',
      'Constraints:',
      '- each step is a concrete action that can be started immediately, not vague advice',
      '- the first step must be doable in under 10 minutes',
      '- one sentence per step, no sub-lists',
      '- answer in English',
      '',
      'Answer ONLY with valid JSON, no surrounding text, no code block, in this exact format:',
      '{"steps":["first step","second step"]}',
    ].join('\n'),
  },
};

function airlockResolveLang(pref) {
  if (AIRLOCK_LANGS.includes(pref)) return pref;
  const nav = (typeof navigator !== 'undefined' && navigator.language) || '';
  return /^fr\b/i.test(nav) ? 'fr' : 'en';
}

function airlockCachedLang() {
  if (!AIRLOCK_EXT_PAGE) return null;
  try { return localStorage.getItem(AIRLOCK_LANG_CACHE); } catch (e) { return null; }
}

let airlockLang = airlockResolveLang(airlockCachedLang());

// Locale tag for dates and times.
function airlockLocale() {
  return airlockLang === 'fr' ? 'fr-FR' : 'en-GB';
}

// airlockT('queueCount', 3) calls a function value with the extra arguments;
// airlockT('tipFocus', { focus }) fills {placeholders} of a string value.
function airlockT(key, ...args) {
  let v = AIRLOCK_STRINGS[airlockLang][key];
  if (v == null) v = AIRLOCK_STRINGS.en[key];
  if (v == null) return key;
  if (typeof v === 'function') return v(...args);
  const vars = args[0];
  return vars ? v.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : v;
}

// Sets the language from a stored preference. Returns true when it changed.
function airlockSetLang(pref) {
  const lang = airlockResolveLang(pref);
  const changed = lang !== airlockLang;
  airlockLang = lang;
  if (AIRLOCK_EXT_PAGE) {
    try { localStorage.setItem(AIRLOCK_LANG_CACHE, lang); } catch (e) {}
  }
  return changed;
}

// Fills the static text of an extension page from its data-i18n* attributes.
function airlockApplyI18n(root) {
  root.querySelectorAll('[data-i18n]').forEach(n => { n.textContent = airlockT(n.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(n => { n.innerHTML = airlockT(n.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-title]').forEach(n => { n.title = airlockT(n.dataset.i18nTitle); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(n => {
    n.placeholder = airlockT(n.dataset.i18nPlaceholder);
  });
  root.querySelectorAll('[data-i18n-aria-label]').forEach(n => {
    n.setAttribute('aria-label', airlockT(n.dataset.i18nAriaLabel));
  });
  document.documentElement.lang = airlockLang;
}

// For pages and the content script: `onReady` runs once the stored choice is
// known, then again after every change of language. Extension pages are
// translated right away from the cached language, before the first paint.
function airlockI18nInit(onReady) {
  if (AIRLOCK_EXT_PAGE) airlockApplyI18n(document);
  chrome.storage.local.get([AIRLOCK_LANG_KEY], r => {
    airlockSetLang(r[AIRLOCK_LANG_KEY]);
    if (AIRLOCK_EXT_PAGE) airlockApplyI18n(document);
    onReady();
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes[AIRLOCK_LANG_KEY]) return;
    if (!airlockSetLang(changes[AIRLOCK_LANG_KEY].newValue)) return;
    if (AIRLOCK_EXT_PAGE) airlockApplyI18n(document);
    onReady();
  });
}
