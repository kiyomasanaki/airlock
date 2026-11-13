// Airlock - focus guard.
//
// Switching away from a focus that is not done scatters the day. So a switch on
// an unfinished focus asks first "is your current focus done?". That question
// is the default: this file only decides when it can be SKIPPED, because the
// new idea is clearly the same subject as the focus (a step of it, a rephrasing).
//
// Two engines, both on the machine, nothing ever sent anywhere:
//  - Chrome's built-in model (Prompt API, Gemini Nano) when it is already
//    downloaded and both texts are in a language it understands (en ja es de fr,
//    detected with the Language Detector API). One session per page, cloned for
//    each check, 2 s at most.
//  - otherwise a word-overlap heuristic. On short texts it finds little overlap
//    almost every time, so it can only ever say "same subject" when the overlap
//    is obvious; anything else keeps the question.
//
// Never triggered by a capture: catching an unrelated idea mid-focus is what
// Airlock is for. Loaded after js/i18n.js by the popup and the wide view.

const AIRLOCK_GUARD_AI_LANGS = ['en', 'ja', 'es', 'de', 'fr'];
const AIRLOCK_GUARD_TIMEOUT_MS = 2000;
const AIRLOCK_GUARD_MIN_LANG_CONFIDENCE = 0.5;   // below that, a short text's language is a guess
// How sure the engines must be that it is the same subject to skip the question.
const AIRLOCK_GUARD_THRESHOLDS = {
  high: { ai: 0.9, overlap: 0.7 },       // asks almost every time
  medium: { ai: 0.75, overlap: 0.5 },
  low: { ai: 0.6, overlap: 0.35 },       // asks less often
};
const AIRLOCK_GUARD_SCHEMA = {
  type: 'object',
  required: ['sameTopic', 'confidence', 'reason'],
  properties: {
    sameTopic: { type: 'boolean' },
    confidence: { type: 'number', minimum: 0, maximum: 1 },
    reason: { type: 'string' },
  },
};
const AIRLOCK_GUARD_SYSTEM = 'You compare two short to-do items written by the same person. '
  + 'Decide whether the new idea is the same subject as the current focus (a step of it, a '
  + 'rephrasing, a detail of the same task) or a different subject. Be strict: two tasks that '
  + 'merely share a context (same client, same tool) are different subjects. '
  + 'Answer only with JSON matching the schema; "reason" is one short English sentence.';

// Options shared by availability() and create(): the doc asks for the same ones.
function airlockGuardModelOptions() {
  return {
    expectedInputs: [{ type: 'text', languages: AIRLOCK_GUARD_AI_LANGS }],
    expectedOutputs: [{ type: 'text', languages: ['en'] }],
  };
}

const airlockGuardEngine = { detector: null, base: null };

// Called once when the popup or the wide view opens. Never downloads anything:
// a download needs a click (Options page), the popup opening is not one.
async function airlockGuardPrepare() {
  try {
    if ('LanguageDetector' in self && await LanguageDetector.availability() === 'available') {
      airlockGuardEngine.detector = await LanguageDetector.create();
    }
  } catch (e) { airlockGuardEngine.detector = null; }
  try {
    if ('LanguageModel' in self && await LanguageModel.availability(airlockGuardModelOptions()) === 'available') {
      airlockGuardEngine.base = await LanguageModel.create({
        ...airlockGuardModelOptions(),
        initialPrompts: [{ role: 'system', content: AIRLOCK_GUARD_SYSTEM }],
      });
    }
  } catch (e) { airlockGuardEngine.base = null; }
}

addEventListener('pagehide', () => {
  const { detector, base } = airlockGuardEngine;
  try { if (detector && detector.destroy) detector.destroy(); } catch (e) {}
  try { if (base) base.destroy(); } catch (e) {}
  airlockGuardEngine.detector = airlockGuardEngine.base = null;
});

// ─── language of the texts ──────────────────────────────────────────────

async function airlockGuardTextLang(text) {
  const d = airlockGuardEngine.detector;
  if (d) {
    try {
      const [top] = await d.detect(text);
      if (top && top.confidence >= AIRLOCK_GUARD_MIN_LANG_CONFIDENCE && top.detectedLanguage !== 'und') {
        return top.detectedLanguage.split('-')[0];
      }
    } catch (e) {}
  }
  return airlockLang.split('-')[0];           // no detector or unsure: the interface language
}

// ─── heuristic ──────────────────────────────────────────────────────────

const AIRLOCK_GUARD_STOP = new Set((
  'the and for with from that this into about your you are was will have has not but '
  + 'les des une pour avec dans sur par que qui est pas mon mes ton tes son ses aux '
  + 'los las del por con una para que como sus '
  + 'der die das und mit fur von den dem ein eine ist auf zum zur '
  + 'dos das uma para com por que nao sem'
).split(' '));
// scripts written without spaces between words: compared by character pairs
const AIRLOCK_GUARD_NO_SPACE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

function airlockGuardNormalize(text) {
  // accents off Latin letters only: Indic and Arabic marks are part of the letter
  return text.normalize('NFKC').toLowerCase().normalize('NFD')
    .replace(/(\p{Script=Latin})\p{Mn}+/gu, '$1').normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ').trim();
}

function airlockGuardTokens(text) {
  const out = new Set();
  for (const w of airlockGuardNormalize(text).split(' ')) {
    if (!w) continue;
    if (AIRLOCK_GUARD_NO_SPACE.test(w)) {
      const ch = [...w];
      if (ch.length === 1) out.add(w);
      for (let i = 0; i + 1 < ch.length; i++) out.add(ch[i] + ch[i + 1]);
    } else if ([...w].length > 2 && !AIRLOCK_GUARD_STOP.has(w)) {
      // crude stem: "mockup" and "mockups", "maquette" and "maquettes" meet
      out.add([...w].slice(0, 5).join(''));
    }
  }
  return out;
}

function airlockGuardHeuristic(focus, idea, threshold) {
  const a = airlockGuardNormalize(focus), b = airlockGuardNormalize(idea);
  // a sub-task that repeats the whole focus title is the same subject
  if (a && b && (a.includes(b) || b.includes(a))) {
    return { sameTopic: true, confidence: 1, reason: 'one text contains the other', source: 'heuristic' };
  }
  const ta = airlockGuardTokens(focus), tb = airlockGuardTokens(idea);
  let common = 0;
  for (const t of ta) if (tb.has(t)) common++;
  const union = ta.size + tb.size - common;
  const overlap = union ? common / union : 0;
  return { sameTopic: overlap >= threshold, confidence: overlap, reason: `word overlap ${overlap.toFixed(2)}`, source: 'heuristic' };
}

// ─── model ──────────────────────────────────────────────────────────────

async function airlockGuardAsk(focus, idea) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AIRLOCK_GUARD_TIMEOUT_MS);
  let session = null;
  try {
    session = await airlockGuardEngine.base.clone({ signal: controller.signal });
    const raw = await session.prompt(
      `Current focus: ${JSON.stringify(focus)}\nNew idea: ${JSON.stringify(idea)}`,
      { signal: controller.signal, responseConstraint: AIRLOCK_GUARD_SCHEMA });
    const r = JSON.parse(raw);
    if (typeof r.sameTopic !== 'boolean' || typeof r.confidence !== 'number'
      || r.confidence < 0 || r.confidence > 1 || typeof r.reason !== 'string') return null;
    return { sameTopic: r.sameTopic, confidence: r.confidence, reason: r.reason, source: 'ai' };
  } catch (e) {
    return null;                                // timeout, NotSupportedError, bad JSON
  } finally {
    clearTimeout(timer);
    try { if (session) session.destroy(); } catch (e) {}
  }
}

// Resolves to { skip, sameTopic, confidence, reason, source }: skip = true means
// "clearly the same subject, do not ask".
async function airlockGuardCheck(focus, idea, sensitivity) {
  const th = AIRLOCK_GUARD_THRESHOLDS[sensitivity] || AIRLOCK_GUARD_THRESHOLDS.medium;
  const fallback = airlockGuardHeuristic(focus, idea, th.overlap);
  let result = fallback;
  if (airlockGuardEngine.base) {
    const [lf, li] = await Promise.all([airlockGuardTextLang(focus), airlockGuardTextLang(idea)]);
    if (AIRLOCK_GUARD_AI_LANGS.includes(lf) && AIRLOCK_GUARD_AI_LANGS.includes(li)) {
      result = (await airlockGuardAsk(focus, idea)) || fallback;
    }
  }
  const skip = result.source === 'ai'
    ? result.sameTopic && result.confidence >= th.ai
    : result.sameTopic;
  return { skip, ...result };
}

// ─── Options page: model state and download ─────────────────────────────

// 'available' | 'downloadable' | 'downloading' | 'unavailable' | 'unsupported'
async function airlockGuardModelState() {
  if (!('LanguageModel' in self)) return 'unsupported';
  try { return await LanguageModel.availability(airlockGuardModelOptions()); } catch (e) { return 'unavailable'; }
}

// Must run inside a click handler (user activation). onProgress gets 0..1.
async function airlockGuardDownload(onProgress) {
  // both started in the same tick: the click's activation expires after a while
  const monitor = m => m.addEventListener('downloadprogress', e => onProgress(e.loaded));
  const detector = 'LanguageDetector' in self ? LanguageDetector.create().catch(() => null) : Promise.resolve(null);
  const model = LanguageModel.create({ ...airlockGuardModelOptions(), monitor });
  const [d, s] = await Promise.all([detector, model]);
  if (d && d.destroy) d.destroy();
  s.destroy();
}
