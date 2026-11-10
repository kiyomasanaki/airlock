# Chrome Web Store listing

Copy to paste into the Store dashboard.

Screenshots for the listing are in [`screenshots/`](screenshots/) (1280×800 PNG): `1-capture`, `2-decision`, `3-priorisation`, `4-steps`, `5-reminder`. Upload them in that order.

---

## Extension name

```
Airlock: Capture & prioritise
```

*(Store max 45 characters; 29 here)*

---

## Short description

Paste into the "Short description" field. **132 characters maximum.**

```
An airlock between impulse and action. Capture the idea instead of diving into it. 100% local, zero telemetry.
```

*(110 characters)*

---

## Detailed description

Paste into the "Detailed description" field. 16,000 characters maximum.

```
You're working. An idea arrives. You dive straight in. Two hours later you realise you dropped something more urgent.

Airlock puts a buffer zone between the impulse and the action. It is designed first for people with ADHD: an idea arrives, it feels urgent, and by the time you surface from it, what you were doing is gone.

━━━━━━━━━━━━━━━━━━━━━━━━

HOW IT WORKS

Ctrl+Shift+E (Cmd+Shift+E on Mac) from any tab. Type the impulse. Enter.

• If you have no current focus, the impulse becomes your focus.
• If you already have a focus, Airlock asks the only question that matters: does this go first?

Three possible answers:
→ switch: the new impulse becomes the focus, the old one moves to the queue
→ queue: it waits its turn, your current focus is preserved
→ drop: discarded, and that's perfectly fine

Keys 1, 2 and 3 answer without touching the mouse. If you close the popup before answering, the impulse is kept and a "?" on the icon waits for you.

When you finish a focus, one click on ✓ archives it and the first queued item automatically takes its place. Misclicked? Every removal can be undone for a few seconds.

━━━━━━━━━━━━━━━━━━━━━━━━

STUCK ON "WHERE DO I START?"

Break your focus into small, concrete steps, the first one doable in under ten minutes. The next step then shows up under your focus, in the popup, on the icon tooltip and in the reminder card. No AI required; an optional local Claude Code bridge can draft the steps for you, in your interface language.

━━━━━━━━━━━━━━━━━━━━━━━━

WHY THIS IS DIFFERENT

Friction is what kills productivity tools. If capturing a thought means opening an app, picking a project and filling in three fields, you won't do it. You'll dive into the impulse instead.

Airlock lives in Chrome, opens from the keyboard, and asks for one thing only: the text of the impulse. No project to pick, no due date, no priority to assign, no account to create.

This is not a task manager. It's an airlock.

━━━━━━━━━━━━━━━━━━━━━━━━

YOUR DATA STAYS PUT

• 100% local storage via chrome.storage.local
• No server, no account, no sync
• No telemetry, no analytics, no tracking, not even "anonymised"
• Minimal permissions at install; access to other sites is only asked for if you turn on the reminder everywhere
• One exception, and only if you turn it on yourself: "Generate with Claude" sends the text of a single impulse to Claude Code, installed on your machine under your own account. Never the queue, never the history.

An Options page lets you export your data as JSON at any time, and import it back. Backup stays under your control.

━━━━━━━━━━━━━━━━━━━━━━━━

PASSIVE REMINDER: ON CLAUDE.AI, OR EVERYWHERE

Out of sight, out of mind. A discreet, draggable card reminds you of your current focus and its next step. On claude.ai it shows by default when you open a new conversation, exactly the moment context-switching happens. Turn on "reminder on every site" in the Options page and it follows you to email, social media, video sites: wherever attention actually escapes.

Dismissible in one click. No page content is ever read.

━━━━━━━━━━━━━━━━━━━━━━━━

WHAT AIRLOCK DOES NOT DO

• No notifications interrupting you
• No gamification, no streaks, no score
• No time tracking
• No productivity reports
• No AI reshuffling your priorities for you

The decisions stay yours. Airlock only forces you to make one.

━━━━━━━━━━━━━━━━━━━━━━━━

LANGUAGE

English and French. Airlock follows your browser language by default; you can pick another one at any time in the Options page, and it switches everywhere at once, with no reload.

━━━━━━━━━━━━━━━━━━━━━━━━

SHORTCUT

Ctrl+Shift+E by default (Cmd+Shift+E on Mac), changeable at chrome://extensions/shortcuts. If that combination is already taken on your machine, Chrome does not bind it: Airlock tells you (Options page at install, "!" badge on the icon) and takes you to the right setting. Meanwhile, one click on the icon does the same.

━━━━━━━━━━━━━━━━━━━━━━━━

Open source, MIT licence: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

About the install warning
If Chrome's Enhanced Safe Browsing is turned on, you may see "This extension is not trusted by Enhanced Safe Browsing". This is about the developer account being new, not about Airlock itself, which has been reviewed and approved by the Chrome Web Store. The message will go away on its own within a few months. You can safely click "Continue to install".
```

---

## Form fields

| Store field | Value |
|---|---|
| **Category** | Productivity |
| **Language** | English (default), French. The name and short description are localised through `_locales/` |
| **Single purpose** | Capture and prioritise user-entered focus items locally, in order to reduce context switching. |
| **`storage` permission justification** | Persist the current focus, the priority queue and the history of completed items locally. No data is transmitted. |
| **`claude.ai` host access justification** | Display a banner reminding the user of their current focus when a new conversation is opened. No page content is read or transmitted. |
| **`scripting` permission justification** | Register the focus reminder card on other websites, only after the user enables that option on the Options page and grants the optional site access. No page content is read or transmitted. |
| **Optional host access (`https://*/*`, `http://*/*`) justification** | Requested at runtime only when the user turns on "reminder on every site"; used solely to display the focus reminder card. Removed when the option is turned off. |
| **Optional `nativeMessaging` justification** | Requested at runtime only when the user clicks "Generate with Claude", to reach a local host the user installed themselves. Inert otherwise. |
| **Data usage** | Tick "This extension does not collect or use user data". |
| **Privacy policy URL** | `https://kiyomasanaki.github.io/airlock/privacy-policy.html` (once GitHub Pages is on, see `publishing.md`) |

