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

The popup shows the first ten queued ideas. Past that, one click opens the wide view: all of Airlock, full screen in a tab, every idea in sight, kept in sync with the popup.

━━━━━━━━━━━━━━━━━━━━━━━━

FOCUS GUARD

Switching away from a focus that is not done is how the day scatters. So when you choose "switch", Airlock first asks: is your current focus done? Yes: it is archived and the new idea takes over. Not yet: Airlock suggests parking the new idea in the queue, and keeps a quieter "switch anyway" for when you really mean it.

The question is skipped when the new idea is clearly the same subject. That check runs on your machine only: with Chrome's built-in local AI model when your computer supports it (English, Spanish, Japanese, German, French), otherwise by comparing the words of the two ideas. Nothing is sent anywhere. You can turn the guard off or change its sensitivity in the Options page.

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

20 languages: English, Simplified Chinese, Hindi, Spanish, French, Arabic, Bengali, Brazilian Portuguese, Russian, Urdu, Indonesian, German, Japanese, Swahili, Marathi, Telugu, Turkish, Tamil, Vietnamese and Korean, with right-to-left layout for Arabic and Urdu. Airlock follows your browser language by default; pick another one from the flag button in the popup or in the Options page, and it switches everywhere at once, with no reload.

The translations were generated automatically. If a sentence sounds wrong in your language, you can correct it line by line on the project website: https://kiyomasanaki.github.io/airlock/translate.html

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
| **Language** | English (default) plus 19 translations, see "Listing in other languages" below. `_locales/` localises the name and short description for 18 of them (not Urdu: Chrome has no `ur` locale) |
| **Single purpose** | Capture and prioritise user-entered focus items locally, in order to reduce context switching. |
| **`storage` permission justification** | Persist the current focus, the priority queue and the history of completed items locally. No data is transmitted. |
| **`claude.ai` host access justification** | Display a banner reminding the user of their current focus when a new conversation is opened. No page content is read or transmitted. |
| **`scripting` permission justification** | Register the focus reminder card on other websites, only after the user enables that option on the Options page and grants the optional site access. No page content is read or transmitted. |
| **Optional host access (`https://*/*`, `http://*/*`) justification** | Requested at runtime only when the user turns on "reminder on every site"; used solely to display the focus reminder card. Removed when the option is turned off. |
| **Optional `nativeMessaging` justification** | Requested at runtime only when the user clicks "Generate with Claude", to reach a local host the user installed themselves. Inert otherwise. |
| **Data usage** | Tick "This extension does not collect or use user data". |
| **Privacy policy URL** | `https://kiyomasanaki.github.io/airlock/privacy-policy.html` (once GitHub Pages is on, see `publishing.md`) |

---

## Listing in other languages

**This is manual work in the dashboard.** `_locales/` only translates the extension name
and its short description (the manifest `name` and `description`), and not for Urdu,
which Chrome does not support as a locale. The detailed description, and the Store name
and short description shown on the listing page, must be pasted language by language:
**Store listing → language selector → add the language → paste the three fields**, then
upload the screenshots (English set, or the French set from
`releases/airlock-<version>-screenshots/fr/` for French).

English is the section above. The 19 blocks below follow the language order of the
extension. The translations are machine-made, like the interface: they can be corrected
through the same page, https://kiyomasanaki.github.io/airlock/translate.html, or by
editing this file.

## Français (fr)

**Name** (45 characters max): `Airlock : capturer et prioriser`

**Short description** (132 characters max): `Un sas entre l'impulsion et l'action. Capture l'idée au lieu de plonger dedans. 100 % local, zéro télémétrie.`

**Detailed description:**

```text
Tu travailles. Une idée arrive. Tu plonges dedans. Deux heures plus tard, tu réalises que tu as lâché quelque chose de plus urgent.

Airlock place un sas entre l'impulsion et l'action. Il est pensé d'abord pour les personnes avec un TDAH : une idée arrive, elle semble urgente, et le temps de refaire surface, ce que tu faisais a disparu.

━━━━━━━━━━━━━━━━━━━━━━━━

COMMENT ÇA MARCHE

Ctrl+Shift+E (Cmd+Shift+E sur Mac) depuis n'importe quel onglet. Tape l'impulsion. Entrée.

• Si tu n'as pas de focus en cours, l'impulsion devient ton focus.
• Si tu as déjà un focus, Airlock pose la seule question qui compte : est-ce que ça passe en premier ?

Trois réponses possibles :
→ je switch : la nouvelle impulsion devient le focus, l'ancien passe dans la file
→ file d'attente : elle attend son tour, ton focus actuel est préservé
→ laisser tomber : écartée, et c'est très bien comme ça

Les touches 1, 2 et 3 répondent sans toucher la souris. Si tu fermes le popup avant de répondre, l'impulsion est gardée et un « ? » t'attend sur l'icône.

Quand tu termines un focus, un clic sur ✓ l'archive et la première idée de la file prend automatiquement sa place. Un clic de travers ? Chaque suppression peut être annulée pendant quelques secondes.

Le popup affiche les dix premières idées de la file. Au-delà, un clic ouvre la vue large : tout Airlock en plein écran dans un onglet, toutes les idées sous les yeux, synchronisées avec le popup.

━━━━━━━━━━━━━━━━━━━━━━━━

GARDE-FOU DU FOCUS

Quitter un focus qui n'est pas terminé, c'est comme ça que la journée s'éparpille. Alors quand tu choisis « je switch », Airlock demande d'abord : ton focus actuel est-il terminé ? Oui : il est archivé et la nouvelle idée prend le relais. Pas encore : Airlock propose de garer la nouvelle idée dans la file, et garde un « changer quand même » plus discret pour quand tu le veux vraiment.

La question est évitée quand la nouvelle idée porte clairement sur le même sujet. Cette vérification se fait uniquement sur ta machine : avec le modèle d'IA local intégré à Chrome quand ton ordinateur le permet (anglais, espagnol, japonais, allemand, français), sinon en comparant les mots des deux idées. Rien n'est envoyé nulle part. Tu peux désactiver le garde-fou ou régler sa sensibilité dans la page Options.

━━━━━━━━━━━━━━━━━━━━━━━━

BLOQUÉ SUR « PAR OÙ JE COMMENCE ? »

Découpe ton focus en petites étapes concrètes, la première faisable en moins de dix minutes. L'étape suivante s'affiche alors sous ton focus, dans le popup, dans l'infobulle de l'icône et sur la carte de rappel. Aucune IA nécessaire ; un pont local optionnel vers Claude Code peut rédiger les étapes pour toi, dans la langue de ton interface.

━━━━━━━━━━━━━━━━━━━━━━━━

POURQUOI C'EST DIFFÉRENT

C'est la friction qui tue les outils de productivité. Si noter une pensée veut dire ouvrir une appli, choisir un projet et remplir trois champs, tu ne le feras pas. Tu plongeras dans l'impulsion à la place.

Airlock vit dans Chrome, s'ouvre au clavier et ne demande qu'une chose : le texte de l'impulsion. Pas de projet à choisir, pas d'échéance, pas de priorité à attribuer, pas de compte à créer.

Ce n'est pas un gestionnaire de tâches. C'est un sas.

━━━━━━━━━━━━━━━━━━━━━━━━

TES DONNÉES RESTENT CHEZ TOI

• Stockage 100 % local via chrome.storage.local
• Pas de serveur, pas de compte, pas de synchronisation
• Aucune télémétrie, aucune statistique, aucun pistage, même « anonymisé »
• Permissions minimales à l'installation ; l'accès aux autres sites n'est demandé que si tu actives le rappel partout
• Une exception, et seulement si tu l'actives toi-même : « Générer avec Claude » envoie le texte d'une seule impulsion à Claude Code, installé sur ta machine sous ton propre compte. Jamais la file, jamais l'historique.

Une page Options permet d'exporter tes données en JSON à tout moment, et de les réimporter. La sauvegarde reste sous ton contrôle.

━━━━━━━━━━━━━━━━━━━━━━━━

RAPPEL DISCRET : SUR CLAUDE.AI, OU PARTOUT

Loin des yeux, loin du cœur. Une carte discrète et déplaçable te rappelle ton focus actuel et sa prochaine étape. Sur claude.ai, elle s'affiche par défaut quand tu ouvres une nouvelle conversation, exactement au moment où l'on change de contexte. Active « rappel sur tous les sites » dans la page Options et elle te suit dans tes mails, sur les réseaux sociaux, les sites de vidéos : partout où l'attention s'échappe vraiment.

Elle se ferme d'un clic. Le contenu des pages n'est jamais lu.

━━━━━━━━━━━━━━━━━━━━━━━━

CE QU'AIRLOCK NE FAIT PAS

• Pas de notifications qui t'interrompent
• Pas de gamification, pas de séries, pas de score
• Pas de suivi du temps
• Pas de rapports de productivité
• Pas d'IA qui réorganise tes priorités à ta place

Les décisions restent les tiennes. Airlock te pousse seulement à en prendre une.

━━━━━━━━━━━━━━━━━━━━━━━━

LANGUE

20 langues : anglais, chinois simplifié, hindi, espagnol, français, arabe, bengali, portugais du Brésil, russe, ourdou, indonésien, allemand, japonais, swahili, marathi, télougou, turc, tamoul, vietnamien et coréen, avec une mise en page de droite à gauche pour l'arabe et l'ourdou. Airlock suit la langue de ton navigateur par défaut ; choisis-en une autre avec le bouton drapeau du popup ou dans la page Options, et tout change d'un coup, sans recharger.

Les traductions ont été générées automatiquement. Si une phrase sonne faux dans ta langue, tu peux la corriger ligne par ligne sur le site du projet : https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

RACCOURCI

Ctrl+Shift+E par défaut (Cmd+Shift+E sur Mac), modifiable dans chrome://extensions/shortcuts. Si cette combinaison est déjà prise sur ta machine, Chrome ne l'attribue pas : Airlock te le signale (page Options à l'installation, badge « ! » sur l'icône) et t'emmène au bon réglage. En attendant, un clic sur l'icône fait la même chose.

━━━━━━━━━━━━━━━━━━━━━━━━

Open source, licence MIT : https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

À propos de l'avertissement à l'installation
Si la Protection renforcée de Chrome est activée, tu verras peut-être « Cette extension n'est pas approuvée par la Protection renforcée ». Cela concerne la nouveauté du compte développeur, pas Airlock lui-même, qui a été examiné et approuvé par le Chrome Web Store. Le message disparaîtra de lui-même d'ici quelques mois. Tu peux cliquer sans crainte sur « Continuer l'installation ».
```

---

## 简体中文 (zh-CN)

**Name** (45 characters max): `Airlock：捕捉与优先排序`

**Short description** (132 characters max): `在冲动与行动之间架起一个气闸。捕捉念头，而不是直接投入其中。100% 本地运行，零遥测。`

**Detailed description:**

```text
你正在工作。一个想法突然出现。你立刻扑了进去。两小时后你才发现自己漏掉了一件更紧急的事。

Airlock 在冲动和行动之间设置了一个缓冲区。它首先是为 ADHD 人群设计的：一个想法出现，感觉很紧急，等你从中回过神来，你原本在做的事已经消失了。

━━━━━━━━━━━━━━━━━━━━━━━━

工作原理

在任意标签页按 Ctrl+Shift+E（Mac 上为 Cmd+Shift+E）。输入这个想法。按 Enter。

• 如果你当前没有焦点，这个念头就会成为你的焦点。
• 如果你已经有一个焦点，Airlock 会问唯一重要的问题：这个要排第一吗？

三种可能的答案：
→ 切换：新的念头成为焦点，旧的那个移入队列
→ 排队：它等待轮到自己，你当前的焦点保持不变
→ 搁置：放弃它，这完全没问题

按键 1、2、3 可以不用鼠标就回答。如果你在回答前关闭了弹出窗口，念头会被保留，图标上的「?」会一直等着你。

当你完成一个焦点时，点击一下 ✓ 就能把它归档，队列中的第一项会自动接替它的位置。误点了？任何删除操作都可以在几秒内撤销。

弹出窗口会显示队列中的前十个念头。超过这个数量，点击一下即可打开宽屏视图：Airlock 的全部内容，在标签页中全屏显示，所有念头一目了然，并与弹出窗口保持同步。

━━━━━━━━━━━━━━━━━━━━━━━━

焦点守护

从一个尚未完成的焦点上转移走，正是一天变得七零八落的原因。所以当你选择「切换」时，Airlock 会先问：你当前的焦点完成了吗？是：它会被归档，新的念头取而代之。还没有：Airlock 会建议把新念头先放进队列，并保留一个不那么张扬的「仍然切换」选项，供你真的需要时使用。

当新念头明显是同一个主题时，这个问题会被跳过。这项检查只在你的本机上运行：如果你的电脑支持，会使用 Chrome 内置的本地 AI 模型（支持英语、西班牙语、日语、德语、法语），否则就通过比较两个念头的用词来判断。没有任何内容会被发送到任何地方。你可以在选项页面关闭这个守护功能，或者调整它的灵敏度。

━━━━━━━━━━━━━━━━━━━━━━━━

卡在「我该从哪里开始？」

把你的焦点拆解成具体的小步骤，第一步要能在十分钟内完成。接下来的步骤会出现在你的焦点下方，在弹出窗口、图标提示和提醒卡片中都能看到。不需要任何 AI；一个可选的本地 Claude Code 桥接功能可以用你的界面语言为你起草这些步骤。

━━━━━━━━━━━━━━━━━━━━━━━━

为什么它不一样

摩擦正是扼杀效率工具的元凶。如果记录一个想法意味着要打开一个应用、选择一个项目、填好三个字段，你根本不会去做。你会直接扑进那个念头里。

Airlock 常驻在 Chrome 中，用键盘就能打开，只要求一件事：这个念头的文字内容。不用选项目，不用设截止日期，不用分配优先级，不用创建账户。

这不是一个任务管理器。它是一个气闸。

━━━━━━━━━━━━━━━━━━━━━━━━

你的数据原地不动

• 100% 通过 chrome.storage.local 本地存储
• 没有服务器，没有账户，没有同步
• 没有遥测，没有分析，没有追踪，连「匿名化」的追踪都没有
• 安装时只请求最小权限；只有当你开启「在所有网站上提醒」时，才会请求访问其他网站
• 唯一的例外，而且只有在你自己开启的情况下：「用 Claude 生成」会把单个念头的文字发送给安装在你机器上、使用你自己账户的 Claude Code。绝不会发送队列或历史记录。

选项页面可以让你随时将数据导出为 JSON，并再导入回来。备份始终由你掌控。

━━━━━━━━━━━━━━━━━━━━━━━━

被动提醒：在 claude.ai 上，或在所有网站上

眼不见，心不念。一张低调、可拖动的卡片会提醒你当前的焦点及其下一步。在 claude.ai 上，默认情况下，打开新对话时它就会显示，这正是任务切换发生的那一刻。在选项页面开启「在所有网站上提醒」，它就会跟随你到邮件、社交媒体、视频网站：注意力真正溜走的任何地方。

一键即可关闭。页面内容绝不会被读取。

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock 不会做的事

• 不会用通知打扰你
• 没有游戏化，没有连续记录，没有分数
• 不记录时间
• 没有效率报告
• 不会用 AI 替你重新排列优先级

决定始终由你做出。Airlock 只是强迫你做出一个决定。

━━━━━━━━━━━━━━━━━━━━━━━━

语言

支持 20 种语言：英语、简体中文、印地语、西班牙语、法语、阿拉伯语、孟加拉语、巴西葡萄牙语、俄语、乌尔都语、印度尼西亚语、德语、日语、斯瓦希里语、马拉地语、泰卢固语、土耳其语、泰米尔语、越南语和韩语，阿拉伯语和乌尔都语采用从右到左的版面。Airlock 默认跟随你的浏览器语言；你也可以在弹出窗口或选项页面的旗标按钮中选择另一种语言，所有界面会立即切换，无需重新加载。

这些翻译是自动生成的。如果某句话在你的语言中听起来不对，你可以在项目网站上逐行修正：https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

快捷键

默认是 Ctrl+Shift+E（Mac 上为 Cmd+Shift+E），可以在 chrome://extensions/shortcuts 中修改。如果这个组合在你的机器上已被占用，Chrome 不会绑定它：Airlock 会告诉你（安装时的选项页面，图标上的「!」徽章），并带你前往正确的设置。同时，点击图标也有同样的效果。

━━━━━━━━━━━━━━━━━━━━━━━━

开源项目，MIT 许可证：https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

关于安装警告
如果 Chrome 的「增强型安全浏览」已开启，你可能会看到「增强型安全浏览不信任此扩展程序」的提示。这与开发者账户较新有关，与 Airlock 本身无关，它已经通过 Chrome 网上应用店的审核并获得批准。这条提示会在几个月内自动消失。你可以放心点击「继续安装」。
```

---

## हिन्दी (hi)

**Name** (45 characters max): `Airlock: विचार कैद करें, प्राथमिकता दें`

**Short description** (132 characters max): `Airlock: विचार और काम के बीच की एक जगह। कूदने के बजाय विचार को कैद करें। 100% लोकल, ज़ीरो टेलीमेट्री।`

**Detailed description:**

```text
तुम काम कर रहे हो। एक विचार आता है। तुम सीधे उसमें कूद जाते हो। दो घंटे बाद पता चलता है कि तुमने कुछ ज़्यादा ज़रूरी काम छोड़ दिया।

Airlock विचार और काम के बीच एक बफर ज़ोन रखता है। यह सबसे पहले ADHD वाले लोगों के लिए बनाया गया है: एक विचार आता है, वह ज़रूरी लगता है, और जब तक तुम उससे बाहर निकलते हो, जो कर रहे थे वह गायब हो चुका होता है।

━━━━━━━━━━━━━━━━━━━━━━━━

यह कैसे काम करता है

किसी भी टैब से Ctrl+Shift+E (Mac पर Cmd+Shift+E) दबाओ। विचार टाइप करो। Enter दबाओ।

• अगर अभी कोई फोकस नहीं है, तो यह विचार तुम्हारा फोकस बन जाता है।
• अगर पहले से एक फोकस है, तो Airlock सिर्फ एक सवाल पूछता है जो सच में मायने रखता है: क्या यह पहले आता है?

तीन मुमकिन जवाब:
→ स्विच: नया विचार फोकस बन जाता है, पुराना वाला कतार में चला जाता है
→ कतार: यह अपनी बारी का इंतज़ार करता है, तुम्हारा अभी का फोकस बना रहता है
→ छोड़ें: इसे छोड़ दिया जाता है, और यह बिल्कुल ठीक है

कीज़ 1, 2 और 3 माउस छुए बिना जवाब देती हैं। अगर तुम जवाब देने से पहले पॉपअप बंद कर देते हो, तो विचार बचा रहता है और आइकन पर एक "?" तुम्हारा इंतज़ार करता है।

जब तुम कोई फोकस पूरा करते हो, तो ✓ पर एक क्लिक उसे आर्काइव कर देता है और कतार में सबसे पहला आइटम खुद-ब-खुद उसकी जगह ले लेता है। गलती से क्लिक हो गया? हर डिलीट को कुछ सेकंड के लिए अनडू किया जा सकता है।

पॉपअप कतार के पहले दस विचार दिखाता है। इससे ज़्यादा होने पर, एक क्लिक वाइड व्यू खोल देता है: पूरा Airlock, टैब में पूरी स्क्रीन पर, हर विचार नज़र में, पॉपअप के साथ सिंक में।

━━━━━━━━━━━━━━━━━━━━━━━━

फोकस गार्ड

किसी अधूरे फोकस से हट जाना ही दिन के बिखरने की वजह बनता है। इसलिए जब तुम "स्विच" चुनते हो, Airlock पहले पूछता है: क्या तुम्हारा अभी का फोकस पूरा हो गया है? हां: वह आर्काइव हो जाता है और नया विचार उसकी जगह ले लेता है। अभी नहीं: Airlock नए विचार को कतार में रखने का सुझाव देता है, और जब तुम सच में ऐसा चाहते हो, उसके लिए एक शांत "फिर भी स्विच करें" ऑप्शन रखता है।

जब नया विचार साफ़ तौर पर उसी विषय का हो, तो यह सवाल टाल दिया जाता है। यह जांच सिर्फ़ तुम्हारी मशीन पर चलती है: जब तुम्हारा कंप्यूटर सपोर्ट करता है (अंग्रेज़ी, स्पैनिश, जापानी, जर्मन, फ़्रेंच) तो Chrome के बिल्ट-इन लोकल AI मॉडल के साथ, नहीं तो दोनों विचारों के शब्दों की तुलना करके। कुछ भी कहीं नहीं भेजा जाता। तुम गार्ड को Options पेज में बंद कर सकते हो या उसकी संवेदनशीलता बदल सकते हो।

━━━━━━━━━━━━━━━━━━━━━━━━

"कहां से शुरू करूं?" में अटके हो

अपने फोकस को छोटे, ठोस स्टेप्स में बांटो, जिसमें पहला स्टेप 10 मिनट से कम में हो जाए। अगला स्टेप फिर तुम्हारे फोकस के नीचे दिखता है: पॉपअप में, आइकन के टूलटिप में और रिमाइंडर कार्ड में। इसके लिए किसी AI की ज़रूरत नहीं; एक वैकल्पिक लोकल Claude Code ब्रिज तुम्हारी इंटरफ़ेस भाषा में स्टेप्स तैयार कर सकता है।

━━━━━━━━━━━━━━━━━━━━━━━━

यह अलग क्यों है

फ्रिक्शन ही प्रोडक्टिविटी टूल्स को बेकार बनाता है। अगर किसी विचार को कैद करने के लिए एक ऐप खोलना, प्रोजेक्ट चुनना और तीन फ़ील्ड भरना पड़े, तो तुम ऐसा नहीं करोगे। तुम इसके बजाय विचार में ही कूद जाओगे।

Airlock Chrome में रहता है, कीबोर्ड से खुलता है, और सिर्फ़ एक चीज़ मांगता है: विचार का टेक्स्ट। कोई प्रोजेक्ट चुनना नहीं, कोई ड्यू डेट नहीं, कोई प्राथमिकता तय करना नहीं, कोई अकाउंट बनाना नहीं।

यह कोई टास्क मैनेजर नहीं है। यह एक एयरलॉक है।

━━━━━━━━━━━━━━━━━━━━━━━━

तुम्हारा डेटा वहीं रहता है

• chrome.storage.local के ज़रिए 100% लोकल स्टोरेज
• कोई सर्वर नहीं, कोई अकाउंट नहीं, कोई सिंक नहीं
• कोई टेलीमेट्री नहीं, कोई एनालिटिक्स नहीं, कोई ट्रैकिंग नहीं, "अनाम" तक भी नहीं
• इंस्टॉल पर न्यूनतम परमिशन; दूसरी साइटों तक पहुंच सिर्फ़ तब मांगी जाती है जब तुम रिमाइंडर को हर जगह ऑन करते हो
• एक अपवाद, और सिर्फ़ तब जब तुम खुद इसे ऑन करते हो: "Generate with Claude" एक ही विचार का टेक्स्ट Claude Code को भेजता है, जो तुम्हारी मशीन पर तुम्हारे अपने अकाउंट के साथ इंस्टॉल है। कभी कतार नहीं, कभी इतिहास नहीं।

Options पेज तुम्हें कभी भी अपना डेटा JSON के रूप में एक्सपोर्ट करने देता है, और उसे वापस इम्पोर्ट करने देता है। बैकअप तुम्हारे ही कंट्रोल में रहता है।

━━━━━━━━━━━━━━━━━━━━━━━━

पैसिव रिमाइंडर: CLAUDE.AI पर, या हर जगह

आंखों से दूर, दिमाग़ से दूर। एक हल्का, खींचकर हटाया जा सकने वाला कार्ड तुम्हें तुम्हारे अभी के फोकस और उसके अगले स्टेप की याद दिलाता है। claude.ai पर यह डिफ़ॉल्ट रूप से तब दिखता है जब तुम नई बातचीत खोलते हो, ठीक उस पल जब context-switching होता है। Options पेज में "reminder on every site" ऑन करो और यह ईमेल, सोशल मीडिया, वीडियो साइटों तक तुम्हारे साथ जाता है: जहां भी ध्यान सच में भटकता है।

एक क्लिक में बंद किया जा सकता है। पेज का कंटेंट कभी नहीं पढ़ा जाता।

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock क्या नहीं करता

• कोई नोटिफिकेशन जो तुम्हें बीच में रोके
• कोई गेमिफिकेशन नहीं, कोई स्ट्रीक नहीं, कोई स्कोर नहीं
• कोई टाइम ट्रैकिंग नहीं
• कोई प्रोडक्टिविटी रिपोर्ट नहीं
• तुम्हारी प्राथमिकताओं को फिर से सजाने वाला कोई AI नहीं

फ़ैसले हमेशा तुम्हारे ही रहते हैं। Airlock सिर्फ़ एक फ़ैसला लेने पर मजबूर करता है।

━━━━━━━━━━━━━━━━━━━━━━━━

भाषा

20 भाषाएं: अंग्रेज़ी, सरलीकृत चीनी, हिन्दी, स्पैनिश, फ़्रेंच, अरबी, बांग्ला, ब्राज़ीलियाई पुर्तगाली, रूसी, उर्दू, इंडोनेशियाई, जर्मन, जापानी, स्वाहिली, मराठी, तेलुगु, तुर्की, तमिल, वियतनामी और कोरियाई, अरबी और उर्दू के लिए राइट-टू-लेफ्ट लेआउट के साथ। Airlock डिफ़ॉल्ट रूप से तुम्हारे ब्राउज़र की भाषा फ़ॉलो करता है; पॉपअप में फ़्लैग बटन से या Options पेज से कोई दूसरी भाषा चुनो, और यह बिना रीलोड किए, तुरंत हर जगह बदल जाती है।

अनुवाद अपने-आप जनरेट किए गए हैं। अगर तुम्हारी भाषा में कोई वाक्य गलत लगे, तो तुम इसे प्रोजेक्ट की वेबसाइट पर एक-एक लाइन करके ठीक कर सकते हो: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

शॉर्टकट

डिफ़ॉल्ट रूप से Ctrl+Shift+E (Mac पर Cmd+Shift+E), जिसे chrome://extensions/shortcuts पर बदला जा सकता है। अगर यह कॉम्बिनेशन तुम्हारी मशीन पर पहले से किसी और चीज़ के पास है, तो Chrome इसे बाइंड नहीं करता: Airlock तुम्हें बताता है (इंस्टॉल पर Options पेज, आइकन पर "!" बैज) और सही सेटिंग तक ले जाता है। इस बीच, आइकन पर एक क्लिक वही काम करता है।

━━━━━━━━━━━━━━━━━━━━━━━━

ओपन सोर्स, MIT लाइसेंस: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

इंस्टॉल चेतावनी के बारे में
अगर Chrome की Enhanced Safe Browsing ऑन है, तो तुम्हें "This extension is not trusted by Enhanced Safe Browsing" दिख सकता है। यह डेवलपर अकाउंट के नए होने के बारे में है, Airlock के बारे में नहीं, जिसे Chrome Web Store ने जांचकर मंज़ूरी दी है। यह मैसेज कुछ महीनों में अपने-आप चला जाएगा। तुम बेफिक्र होकर "Continue to install" पर क्लिक कर सकते हो।
```

---

## Español (es)

**Name** (45 characters max): `Airlock: capturar y priorizar`

**Short description** (132 characters max): `Un airlock entre el impulso y la acción. Captura la idea en vez de lanzarte a ella. 100% local, cero telemetría.`

**Detailed description:**

```text
Estás trabajando. Llega una idea. Te lanzas directamente a ella. Dos horas después te das cuenta de que dejaste algo más urgente sin hacer.

Airlock pone una zona de amortiguación entre el impulso y la acción. Está pensado primero para personas con TDAH: una idea llega, se siente urgente, y para cuando vuelves a la superficie, lo que estabas haciendo ya ha desaparecido.

━━━━━━━━━━━━━━━━━━━━━━━━

CÓMO FUNCIONA

Ctrl+Shift+E (Cmd+Shift+E en Mac) desde cualquier pestaña. Escribe el impulso. Intro.

• Si no tienes ningún foco actual, el impulso se convierte en tu foco.
• Si ya tienes un foco, Airlock hace la única pregunta que importa: ¿esto pasa primero?

Tres respuestas posibles:
→ cambiar: el nuevo impulso se convierte en el foco, el anterior pasa a la cola
→ en cola: espera su turno, tu foco actual se mantiene
→ dejarlo: se descarta, y está perfectamente bien

Las teclas 1, 2 y 3 responden sin tocar el ratón. Si cierras el popup antes de responder, el impulso se conserva y un "?" en el icono te espera.

Cuando terminas un foco, un clic en ✓ lo archiva y el primero de la cola ocupa automáticamente su lugar. ¿Clic equivocado? Cualquier eliminación se puede deshacer durante unos segundos.

El popup muestra las diez primeras ideas en cola. Más allá, un clic abre la vista amplia: todo Airlock, a pantalla completa en una pestaña, con cada idea a la vista, sincronizada con el popup.

━━━━━━━━━━━━━━━━━━━━━━━━

GUARDIÁN DEL FOCO

Cambiar de un foco que no está terminado es lo que hace que el día se disperse. Por eso, cuando eliges "cambiar", Airlock primero pregunta: ¿tu foco actual está terminado? Sí: se archiva y la nueva idea toma el relevo. Todavía no: Airlock sugiere aparcar la nueva idea en la cola, y guarda un discreto "cambiar de todos modos" para cuando realmente lo necesitas.

La pregunta se salta cuando la nueva idea trata claramente el mismo tema. Esa comprobación se ejecuta solo en tu máquina: con el modelo de IA local integrado en Chrome cuando tu ordenador es compatible (inglés, español, japonés, alemán, francés), o si no, comparando las palabras de las dos ideas. No se envía nada a ningún sitio. Puedes desactivar el guardián o cambiar su sensibilidad en la página de Opciones.

━━━━━━━━━━━━━━━━━━━━━━━━

ATASCADO EN "¿POR DÓNDE EMPIEZO?"

Divide tu foco en pasos pequeños y concretos, el primero realizable en menos de diez minutos. El siguiente paso aparece entonces bajo tu foco, en el popup, en la información del icono y en la tarjeta de recordatorio. No necesita IA; un puente opcional y local con Claude Code puede redactar los pasos por ti, en tu idioma de interfaz.

━━━━━━━━━━━━━━━━━━━━━━━━

POR QUÉ ES DIFERENTE

La fricción es lo que mata las herramientas de productividad. Si capturar un pensamiento significa abrir una app, elegir un proyecto y rellenar tres campos, no lo harás. Te lanzarás al impulso en su lugar.

Airlock vive en Chrome, se abre desde el teclado y pide una sola cosa: el texto del impulso. Sin proyecto que elegir, sin fecha límite, sin prioridad que asignar, sin cuenta que crear.

Esto no es un gestor de tareas. Es un airlock.

━━━━━━━━━━━━━━━━━━━━━━━━

TUS DATOS SE QUEDAN DONDE ESTÁN

• Almacenamiento 100% local mediante chrome.storage.local
• Sin servidor, sin cuenta, sin sincronización
• Sin telemetría, sin analítica, sin seguimiento, ni siquiera "anonimizado"
• Permisos mínimos en la instalación; el acceso a otros sitios solo se pide si activas el recordatorio en todos los sitios
• Una excepción, y solo si la activas tú mismo: "Generar con Claude" envía el texto de un único impulso a Claude Code, instalado en tu máquina con tu propia cuenta. Nunca la cola, nunca el historial.

Una página de Opciones te permite exportar tus datos como JSON en cualquier momento, e importarlos de vuelta. La copia de seguridad queda bajo tu control.

━━━━━━━━━━━━━━━━━━━━━━━━

RECORDATORIO PASIVO: EN CLAUDE.AI, O EN TODOS LOS SITIOS

Lo que no se ve, se olvida. Una tarjeta discreta y arrastrable te recuerda tu foco actual y su siguiente paso. En claude.ai aparece por defecto cuando abres una nueva conversación, justo el momento en que ocurre el cambio de contexto. Activa "recordatorio en todos los sitios" en la página de Opciones y te seguirá al correo, las redes sociales, los sitios de vídeo: donde la atención realmente se escapa.

Se puede cerrar con un clic. Nunca se lee el contenido de la página.

━━━━━━━━━━━━━━━━━━━━━━━━

LO QUE AIRLOCK NO HACE

• Sin notificaciones que te interrumpan
• Sin gamificación, sin rachas, sin puntuación
• Sin seguimiento del tiempo
• Sin informes de productividad
• Sin IA que reordene tus prioridades por ti

Las decisiones siguen siendo tuyas. Airlock solo te obliga a tomar una.

━━━━━━━━━━━━━━━━━━━━━━━━

IDIOMA

20 idiomas: inglés, chino simplificado, hindi, español, francés, árabe, bengalí, portugués de Brasil, ruso, urdu, indonesio, alemán, japonés, swahili, maratí, telugu, turco, tamil, vietnamita y coreano, con disposición de derecha a izquierda para árabe y urdu. Airlock sigue el idioma de tu navegador por defecto; elige otro desde el botón de bandera en el popup o en la página de Opciones, y cambia en todas partes a la vez, sin recargar.

Las traducciones se generaron automáticamente. Si una frase suena mal en tu idioma, puedes corregirla línea por línea en el sitio del proyecto: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

ATAJO

Ctrl+Shift+E por defecto (Cmd+Shift+E en Mac), modificable en chrome://extensions/shortcuts. Si esa combinación ya está en uso en tu máquina, Chrome no la asigna: Airlock te avisa (página de Opciones al instalar, insignia "!" en el icono) y te lleva al ajuste correcto. Mientras tanto, un clic en el icono hace lo mismo.

━━━━━━━━━━━━━━━━━━━━━━━━

Código abierto, licencia MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Sobre la advertencia de instalación
Si la Navegación segura mejorada de Chrome está activada, es posible que veas "Esta extensión no cuenta con la confianza de la Navegación segura mejorada". Esto se debe a que la cuenta de desarrollador es nueva, no a Airlock en sí, que ha sido revisado y aprobado por la Chrome Web Store. El mensaje desaparecerá por sí solo en unos meses. Puedes hacer clic con tranquilidad en "Continuar con la instalación".
```

---

## العربية (ar)

**Name** (45 characters max): `Airlock: تسجيل وترتيب الأولويات`

**Short description** (132 characters max): `حاجز بين الفكرة والفعل. سجّل الفكرة بدلاً من الانغماس فيها فورًا. محلي 100%، بلا أي تتبع.`

**Detailed description:**

```text
أنت تعمل. تصلك فكرة. تنغمس فيها فورًا. بعد ساعتين تكتشف أنك أهملت شيئًا أكثر إلحاحًا.

Airlock يضع منطقة عازلة بين الفكرة والفعل. صُمم أولًا لمن يعانون من اضطراب نقص الانتباه وفرط الحركة: تصل الفكرة، تبدو ملحّة، وبحلول الوقت الذي تعود فيه إلى الواقع، يكون ما كنت تفعله قد تلاشى.

━━━━━━━━━━━━━━━━━━━━━━━━

كيف يعمل

Ctrl+Shift+E (أو Cmd+Shift+E على Mac) من أي علامة تبويب. اكتب الفكرة. Enter.

• إذا لم يكن لديك تركيز حالي، تصبح الفكرة تركيزك.
• إذا كان لديك تركيز بالفعل، يسأل Airlock السؤال الوحيد المهم: هل تتقدّم على ما سبق؟

ثلاث إجابات ممكنة:
→ بدّل: تصبح الفكرة الجديدة التركيز، وينتقل التركيز القديم إلى الطابور
→ انتظار: تنتظر دورها، ويبقى تركيزك الحالي كما هو
→ اترك: تُهمَل، وهذا أمر طبيعي تمامًا

المفاتيح 1 و2 و3 تجيب دون لمس الفأرة. إذا أغلقت النافذة المنبثقة قبل الإجابة، تبقى الفكرة محفوظة وتظهر علامة "؟" على الأيقونة في انتظارك.

عندما تُنهي تركيزًا، نقرة واحدة على ✓ تؤرشفه، ويأخذ العنصر الأول في الطابور مكانه تلقائيًا. ضغطت بالخطأ؟ يمكن التراجع عن كل حذف لبضع ثوانٍ.

تعرض النافذة المنبثقة أول عشر أفكار في الطابور. وبعد ذلك، نقرة واحدة تفتح العرض الواسع: كل Airlock بملء الشاشة في علامة تبويب، كل فكرة أمامك، متزامنة مع النافذة المنبثقة.

━━━━━━━━━━━━━━━━━━━━━━━━

حارس التركيز

الانتقال من تركيز لم ينتهِ بعد هو ما يبعثر يومك. لذلك عندما تختار "بدّل"، يسأل Airlock أولًا: هل انتهى تركيزك الحالي؟ نعم: يُؤرشَف وتأخذ الفكرة الجديدة مكانه. ليس بعد: يقترح Airlock وضع الفكرة الجديدة في الطابور، ويحتفظ بخيار أكثر هدوءًا وهو "بدّل على أي حال" لمن يريد ذلك بالفعل.

يتم تجاوز السؤال عندما تكون الفكرة الجديدة بوضوح نفس الموضوع. يتم هذا الفحص على جهازك فقط: باستخدام نموذج الذكاء الاصطناعي المحلي المدمج في Chrome إذا كان جهازك يدعمه (الإنجليزية، الإسبانية، اليابانية، الألمانية، الفرنسية)، وإلا فبمقارنة كلمات الفكرتين. لا يُرسَل شيء إلى أي مكان. يمكنك إيقاف الحارس أو تغيير حساسيته من صفحة الخيارات.

━━━━━━━━━━━━━━━━━━━━━━━━

عالق عند "من أين أبدأ؟"

قسّم تركيزك إلى خطوات صغيرة وملموسة، أولها قابل للتنفيذ في أقل من عشر دقائق. تظهر الخطوة التالية بعد ذلك تحت تركيزك، في النافذة المنبثقة، وفي تلميح الأيقونة وفي بطاقة التذكير. لا حاجة إلى ذكاء اصطناعي؛ يمكن لجسر Claude Code المحلي الاختياري أن يُعِدّ لك الخطوات، بلغة واجهتك.

━━━━━━━━━━━━━━━━━━━━━━━━

لماذا هذا مختلف

الاحتكاك هو ما يقتل أدوات الإنتاجية. إذا كان تسجيل فكرة يعني فتح تطبيق واختيار مشروع وتعبئة ثلاثة حقول، فلن تفعلها. ستنغمس في الفكرة مباشرة بدلًا من ذلك.

يعيش Airlock داخل Chrome، يُفتح من لوحة المفاتيح، ولا يطلب سوى شيء واحد: نص الفكرة. لا مشروع لاختياره، لا تاريخ استحقاق، لا أولوية لتحديدها، لا حساب لإنشائه.

هذا ليس مدير مهام. إنه حاجز انتقال.

━━━━━━━━━━━━━━━━━━━━━━━━

بياناتك تبقى عندك

• تخزين محلي 100% عبر chrome.storage.local
• لا خادم، لا حساب، لا مزامنة
• لا تتبع، لا تحليلات، لا رقابة، ولا حتى "مجهولة الهوية"
• أذونات محدودة عند التثبيت؛ لا يُطلَب الوصول إلى المواقع الأخرى إلا إذا فعّلت التذكير في كل مكان
• استثناء واحد، ولا يحدث إلا إذا فعّلته أنت بنفسك: "الإنشاء مع Claude" يرسل نص فكرة واحدة إلى Claude Code، المثبَّت على جهازك بحسابك الخاص. لا يُرسَل الطابور ولا السجل أبدًا.

تتيح لك صفحة الخيارات تصدير بياناتك كملف JSON في أي وقت، واستيرادها مرة أخرى. النسخة الاحتياطية تبقى تحت سيطرتك.

━━━━━━━━━━━━━━━━━━━━━━━━

تذكير غير تدخلي: على claude.ai، أو في كل مكان

بعيدًا عن الأنظار، بعيدًا عن التفكير. بطاقة بسيطة قابلة للسحب تذكّرك بتركيزك الحالي وخطوته التالية. على claude.ai تظهر افتراضيًا عند فتح محادثة جديدة، وهي اللحظة التي يحدث فيها تبديل السياق بالضبط. فعّل "التذكير على كل موقع" في صفحة الخيارات لتتبعك إلى البريد الإلكتروني ومواقع التواصل ومواقع الفيديو: أينما يهرب الانتباه فعليًا.

تُغلَق بنقرة واحدة. لا يُقرأ محتوى الصفحة أبدًا.

━━━━━━━━━━━━━━━━━━━━━━━━

ما لا يفعله Airlock

• لا إشعارات تقاطعك
• لا تلعيب، لا سلاسل إنجاز، لا نقاط
• لا تتبع للوقت
• لا تقارير إنتاجية
• لا ذكاء اصطناعي يعيد ترتيب أولوياتك عنك

القرارات تبقى لك. Airlock يفرض عليك فقط اتخاذ واحد منها.

━━━━━━━━━━━━━━━━━━━━━━━━

اللغة

20 لغة: الإنجليزية، الصينية المبسطة، الهندية، الإسبانية، الفرنسية، العربية، البنغالية، البرتغالية البرازيلية، الروسية، الأردية، الإندونيسية، الألمانية، اليابانية، السواحيلية، الماراثية، التيلوغو، التركية، التاميلية، الفيتنامية والكورية، مع تخطيط من اليمين إلى اليسار للعربية والأردية. يتبع Airlock لغة متصفحك تلقائيًا؛ اختر لغة أخرى من زر العلم في النافذة المنبثقة أو في صفحة الخيارات، ويتغيّر كل شيء في آن واحد، دون إعادة تحميل.

تمت ترجمة النصوص تلقائيًا. إذا بدت جملة غير صحيحة في لغتك، يمكنك تصحيحها سطرًا بسطر على موقع المشروع: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

الاختصار

Ctrl+Shift+E افتراضيًا (Cmd+Shift+E على Mac)، قابل للتغيير من chrome://extensions/shortcuts. إذا كان هذا المزيج محجوزًا على جهازك، لا يربطه Chrome: يُخبرك Airlock بذلك (صفحة الخيارات عند التثبيت، شارة "!" على الأيقونة) ويأخذك إلى الإعداد الصحيح. في انتظار ذلك، نقرة واحدة على الأيقونة تفعل الشيء نفسه.

━━━━━━━━━━━━━━━━━━━━━━━━

مفتوح المصدر، ترخيص MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

بخصوص تحذير التثبيت
إذا كانت ميزة "التصفح الآمن المعزَّز" من Chrome مفعّلة، قد تظهر لك رسالة "هذا الامتداد غير موثوق من قِبل Enhanced Safe Browsing". هذا يتعلق بكون حساب المطوّر جديدًا، لا بـ Airlock نفسه، الذي تمت مراجعته واعتماده من متجر Chrome الإلكتروني. ستختفي الرسالة من نفسها في غضون بضعة أشهر. يمكنك النقر بأمان على "الاستمرار في التثبيت".
```

---

## বাংলা (bn)

**Name** (45 characters max): `Airlock: ভাবনা ধরো, অগ্রাধিকার দাও`

**Short description** (132 characters max): `ভাবনা আর কাজের মাঝে Airlock। ঝাঁপ দেওয়ার বদলে ভাবনাটা ধরে রাখো। 100% লোকাল, জিরো টেলিমেট্রি।`

**Detailed description:**

```text
তুমি কাজ করছো। একটা ভাবনা আসে। তুমি সোজা তার মধ্যে ঝাঁপ দাও। দুই ঘণ্টা পর বুঝতে পারো যে তুমি তার চেয়ে বেশি জরুরি কিছু ছেড়ে দিয়েছো।

Airlock ভাবনা আর কাজের মাঝে একটা বাফার জোন রাখে। এটা প্রথমে ADHD আছে এমন মানুষদের জন্য বানানো: একটা ভাবনা আসে, সেটা জরুরি মনে হয়, আর যতক্ষণে তুমি তার থেকে বেরিয়ে আসো, যা করছিলে তা হারিয়ে গেছে।

━━━━━━━━━━━━━━━━━━━━━━━━

এটা কীভাবে কাজ করে

যেকোনো ট্যাব থেকে Ctrl+Shift+E (Mac-এ Cmd+Shift+E) চাপো। ভাবনাটা টাইপ করো। Enter চাপো।

• এখন কোনো ফোকাস না থাকলে, এই ভাবনাটাই তোমার ফোকাস হয়ে যায়।
• আগে থেকে একটা ফোকাস থাকলে, Airlock একটাই আসল প্রশ্ন করে: এটা কি আগে যাবে?

তিনটা সম্ভাব্য উত্তর:
→ সুইচ: নতুন ভাবনাটা ফোকাস হয়ে যায়, পুরোনোটা সারিতে চলে যায়
→ সারি: এটা তার পালার জন্য অপেক্ষা করে, তোমার এখনকার ফোকাস অটুট থাকে
→ ছেড়ে দাও: এটা বাদ দেওয়া হয়, আর এটা একদম ঠিক আছে

1, 2 আর 3 এই কি-গুলো মাউস না ছুঁয়েই উত্তর দেয়। উত্তর দেওয়ার আগে পপআপ বন্ধ করে দিলে, ভাবনাটা থেকে যায় আর আইকনে একটা "?" তোমার জন্য অপেক্ষা করে।

তুমি একটা ফোকাস শেষ করলে, ✓-এ এক ক্লিক সেটা আর্কাইভ করে দেয় আর সারির প্রথম আইটেমটা আপনা-আপনি তার জায়গা নেয়। ভুল করে ক্লিক হয়ে গেল? যেকোনো মুছে ফেলা কয়েক সেকেন্ডের জন্য ফিরিয়ে আনা যায়।

পপআপ সারির প্রথম দশটা ভাবনা দেখায়। তার বেশি হলে, এক ক্লিকে ওয়াইড ভিউ খোলে: পুরো Airlock, ট্যাবে সম্পূর্ণ স্ক্রিনে, প্রতিটা ভাবনা চোখের সামনে, পপআপের সাথে সিঙ্কে।

━━━━━━━━━━━━━━━━━━━━━━━━

ফোকাস গার্ড

শেষ হয়নি এমন একটা ফোকাস থেকে সরে যাওয়াই দিনটা ছড়িয়ে যাওয়ার কারণ হয়। তাই তুমি "সুইচ" বেছে নিলে, Airlock আগে জিজ্ঞেস করে: তোমার এখনকার ফোকাস কি শেষ হয়েছে? হ্যাঁ: এটা আর্কাইভ হয়ে যায় আর নতুন ভাবনাটা তার জায়গা নেয়। এখনও না: Airlock নতুন ভাবনাটা সারিতে রাখার পরামর্শ দেয়, আর তুমি সত্যিই চাইলে তার জন্য একটা শান্ত "তাও সুইচ করো" অপশন রাখে।

নতুন ভাবনাটা স্পষ্টভাবে একই বিষয়ের হলে, এই প্রশ্নটা এড়িয়ে যায়। এই যাচাই শুধু তোমার মেশিনে চলে: তোমার কম্পিউটার সমর্থন করলে (ইংরেজি, স্প্যানিশ, জাপানি, জার্মান, ফ্রেঞ্চ) Chrome-এর বিল্ট-ইন লোকাল AI মডেল দিয়ে, না হলে দুটো ভাবনার শব্দ তুলনা করে। কিছুই কোথাও পাঠানো হয় না। তুমি Options পেজে গার্ড বন্ধ করতে পারো বা তার সংবেদনশীলতা বদলাতে পারো।

━━━━━━━━━━━━━━━━━━━━━━━━

"কোথা থেকে শুরু করবো?"-তে আটকে আছো

তোমার ফোকাসটাকে ছোট ছোট, ঠোস ধাপে ভাগ করো, যার প্রথমটা 10 মিনিটের কমে হয়ে যায়। পরের ধাপটা তখন তোমার ফোকাসের নিচে দেখা যায়: পপআপে, আইকনের টুলটিপে আর রিমাইন্ডার কার্ডে। এর জন্য কোনো AI লাগে না; একটা ঐচ্ছিক লোকাল Claude Code ব্রিজ তোমার ইন্টারফেসের ভাষায় ধাপগুলো তৈরি করে দিতে পারে।

━━━━━━━━━━━━━━━━━━━━━━━━

এটা কেন আলাদা

ফ্রিকশনই প্রোডাক্টিভিটি টুল মেরে ফেলে। একটা ভাবনা ধরে রাখতে যদি একটা অ্যাপ খুলতে হয়, প্রোজেক্ট বেছে নিতে হয় আর তিনটা ফিল্ড ভরতে হয়, তুমি সেটা করবেই না। তার বদলে তুমি সরাসরি সেই ভাবনায় ঝাঁপ দেবে।

Airlock Chrome-এর ভেতরেই থাকে, কিবোর্ড থেকে খোলে, আর একটা জিনিসই চায়: ভাবনাটার লেখা। কোনো প্রোজেক্ট বাছতে হয় না, কোনো ডেডলাইন নেই, কোনো অগ্রাধিকার ঠিক করতে হয় না, কোনো অ্যাকাউন্ট খুলতে হয় না।

এটা কোনো টাস্ক ম্যানেজার নয়। এটা একটা Airlock।

━━━━━━━━━━━━━━━━━━━━━━━━

তোমার ডেটা তোমার কাছেই থাকে

• chrome.storage.local দিয়ে 100% লোকাল স্টোরেজ
• কোনো সার্ভার নেই, কোনো অ্যাকাউন্ট নেই, কোনো সিঙ্ক নেই
• কোনো টেলিমেট্রি নেই, কোনো অ্যানালিটিক্স নেই, কোনো ট্র্যাকিং নেই, "নামহীন" করেও নয়
• ইনস্টলে সর্বনিম্ন পারমিশন; অন্য সাইটে অ্যাক্সেস তখনই চাওয়া হয় যখন তুমি রিমাইন্ডারটা সব জায়গায় চালু করো
• একটা ব্যতিক্রম, আর তখনই যখন তুমি নিজে এটা চালু করো: "Generate with Claude" শুধু একটা ভাবনার লেখা Claude Code-এ পাঠায়, যা তোমার মেশিনে তোমার নিজের অ্যাকাউন্টে ইনস্টল করা থাকে। কখনো সারি নয়, কখনো ইতিহাস নয়।

Options পেজ তোমাকে যেকোনো সময় তোমার ডেটা JSON হিসেবে এক্সপোর্ট করতে দেয়, আর তা আবার ইম্পোর্ট করতে দেয়। ব্যাকআপ তোমারই নিয়ন্ত্রণে থাকে।

━━━━━━━━━━━━━━━━━━━━━━━━

প্যাসিভ রিমাইন্ডার: CLAUDE.AI-তে, বা সব জায়গায়

চোখের আড়াল, মনেরও আড়াল। একটা হালকা, টেনে সরানো যায় এমন কার্ড তোমাকে তোমার এখনকার ফোকাস আর তার পরের ধাপের কথা মনে করিয়ে দেয়। claude.ai-তে এটা স্বাভাবিকভাবেই দেখা যায় যখন তুমি একটা নতুন কথোপকথন খোলো, ঠিক সেই মুহূর্তে যখন context-switching ঘটে। Options পেজে "reminder on every site" চালু করো আর এটা ইমেল, সোশ্যাল মিডিয়া, ভিডিও সাইট পর্যন্ত তোমার সাথে যায়: যেখানেই মনোযোগ সত্যিই হারিয়ে যায়।

এক ক্লিকে বন্ধ করা যায়। পেজের কনটেন্ট কখনো পড়া হয় না।

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock যা করে না

• তোমাকে বাধা দেওয়ার মতো কোনো নোটিফিকেশন নেই
• কোনো গেমিফিকেশন নেই, কোনো স্ট্রিক নেই, কোনো স্কোর নেই
• কোনো টাইম ট্র্যাকিং নেই
• কোনো প্রোডাক্টিভিটি রিপোর্ট নেই
• তোমার অগ্রাধিকার নিজে বদলে দেওয়ার মতো কোনো AI নেই

সিদ্ধান্তগুলো সবসময় তোমারই থাকে। Airlock শুধু তোমাকে একটা সিদ্ধান্ত নিতে বাধ্য করে।

━━━━━━━━━━━━━━━━━━━━━━━━

ভাষা

20টা ভাষা: ইংরেজি, সরলীকৃত চীনা, হিন্দি, স্প্যানিশ, ফ্রেঞ্চ, আরবি, বাংলা, ব্রাজিলীয় পর্তুগিজ, রুশ, উর্দু, ইন্দোনেশীয়, জার্মান, জাপানি, সোয়াহিলি, মারাঠি, তেলুগু, তুর্কি, তামিল, ভিয়েতনামি আর কোরিয়ান, আরবি আর উর্দুর জন্য রাইট-টু-লেফ্ট লেআউট সহ। Airlock স্বাভাবিকভাবে তোমার ব্রাউজারের ভাষা অনুসরণ করে; পপআপের ফ্ল্যাগ বোতাম থেকে বা Options পেজ থেকে অন্য একটা ভাষা বেছে নাও, আর এটা রিলোড না করেই সঙ্গে সঙ্গে সব জায়গায় বদলে যায়।

অনুবাদগুলো স্বয়ংক্রিয়ভাবে তৈরি হয়েছে। তোমার ভাষায় কোনো বাক্য ভুল শোনালে, তুমি এটা প্রোজেক্টের ওয়েবসাইটে এক লাইন করে ঠিক করতে পারো: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

শর্টকাট

স্বাভাবিকভাবে Ctrl+Shift+E (Mac-এ Cmd+Shift+E), যা chrome://extensions/shortcuts-এ বদলানো যায়। এই কম্বিনেশনটা তোমার মেশিনে আগে থেকেই অন্য কিছুর জন্য নেওয়া থাকলে, Chrome এটা বাইন্ড করে না: Airlock তোমাকে জানায় (ইনস্টলের সময় Options পেজ, আইকনে "!" ব্যাজ) আর সঠিক সেটিংয়ে নিয়ে যায়। তার মধ্যে, আইকনে এক ক্লিকে একই কাজ হয়।

━━━━━━━━━━━━━━━━━━━━━━━━

ওপেন সোর্স, MIT লাইসেন্স: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

ইনস্টল সতর্কবার্তা নিয়ে
Chrome-এর Enhanced Safe Browsing চালু থাকলে, তুমি "This extension is not trusted by Enhanced Safe Browsing" দেখতে পারো। এটা ডেভেলপার অ্যাকাউন্ট নতুন হওয়ার ব্যাপার, Airlock নিয়ে নয়, যা Chrome Web Store যাচাই করে অনুমোদন দিয়েছে। এই মেসেজটা কয়েক মাসের মধ্যে নিজেই চলে যাবে। তুমি নিশ্চিন্তে "Continue to install"-এ ক্লিক করতে পারো।
```

---

## Português (Brasil) (pt-BR)

**Name** (45 characters max): `Airlock: capturar e priorizar`

**Short description** (132 characters max): `Um airlock entre o impulso e a ação. Capture a ideia em vez de mergulhar nela. 100% local, zero telemetria.`

**Detailed description:**

```text
Você está trabalhando. Uma ideia surge. Você mergulha direto nela. Duas horas depois, percebe que deixou passar algo mais urgente.

O Airlock cria uma zona de amortecimento entre o impulso e a ação. Ele foi pensado primeiro para pessoas com TDAH: uma ideia surge, parece urgente, e quando você volta à superfície, o que estava fazendo já desapareceu.

━━━━━━━━━━━━━━━━━━━━━━━━

COMO FUNCIONA

Ctrl+Shift+E (Cmd+Shift+E no Mac) em qualquer aba. Digite o impulso. Enter.

• Se você não tem um foco atual, o impulso se torna seu foco.
• Se você já tem um foco, o Airlock faz a única pergunta que importa: isso vem primeiro?

Três respostas possíveis:
→ trocar: o novo impulso se torna o foco, o antigo vai para a fila
→ fila: ele espera a vez, seu foco atual é preservado
→ deixar passar: descartado, e está tudo bem

As teclas 1, 2 e 3 respondem sem tocar no mouse. Se você fechar o popup antes de responder, o impulso é mantido e um "?" no ícone espera por você.

Quando você termina um foco, um clique no ✓ o arquiva e o primeiro da fila assume automaticamente o lugar. Clicou errado? Qualquer remoção pode ser desfeita por alguns segundos.

O popup mostra as dez primeiras ideias na fila. Além disso, um clique abre a visão ampla: todo o Airlock, em tela cheia em uma aba, com cada ideia à vista, sincronizada com o popup.

━━━━━━━━━━━━━━━━━━━━━━━━

GUARDA DO FOCO

Trocar de um foco que não está concluído é o que faz o dia se dispersar. Por isso, quando você escolhe "trocar", o Airlock primeiro pergunta: seu foco atual está concluído? Sim: ele é arquivado e a nova ideia assume. Ainda não: o Airlock sugere guardar a nova ideia na fila, mantendo um discreto "trocar assim mesmo" para quando você realmente quer isso.

A pergunta é pulada quando a nova ideia é claramente sobre o mesmo assunto. Essa verificação acontece só na sua máquina: com o modelo de IA local do Chrome quando seu computador é compatível (inglês, espanhol, japonês, alemão, francês), ou, caso contrário, comparando as palavras das duas ideias. Nada é enviado a lugar nenhum. Você pode desativar a guarda ou mudar sua sensibilidade na página de Opções.

━━━━━━━━━━━━━━━━━━━━━━━━

PRESO NO "POR ONDE EU COMEÇO?"

Divida seu foco em passos pequenos e concretos, o primeiro deles realizável em menos de dez minutos. O próximo passo aparece então embaixo do seu foco, no popup, na dica do ícone e no cartão de lembrete. Não precisa de IA; uma ponte opcional e local com o Claude Code pode rascunhar os passos para você, no seu idioma de interface.

━━━━━━━━━━━━━━━━━━━━━━━━

POR QUE ISSO É DIFERENTE

Atrito é o que mata as ferramentas de produtividade. Se capturar um pensamento significa abrir um app, escolher um projeto e preencher três campos, você não vai fazer isso. Vai mergulhar direto no impulso.

O Airlock vive no Chrome, abre pelo teclado e pede uma única coisa: o texto do impulso. Sem projeto para escolher, sem data de entrega, sem prioridade para definir, sem conta para criar.

Isso não é um gerenciador de tarefas. É um airlock.

━━━━━━━━━━━━━━━━━━━━━━━━

SEUS DADOS FICAM NO LUGAR

• Armazenamento 100% local via chrome.storage.local
• Sem servidor, sem conta, sem sincronização
• Sem telemetria, sem análise, sem rastreamento, nem mesmo "anonimizado"
• Permissões mínimas na instalação; o acesso a outros sites só é pedido se você ativar o lembrete em todos os sites
• Uma exceção, e só se você mesmo ativar: "Gerar com Claude" envia o texto de um único impulso para o Claude Code, instalado na sua máquina com sua própria conta. Nunca a fila, nunca o histórico.

Uma página de Opções permite exportar seus dados como JSON a qualquer momento, e importá-los de volta. O backup fica sob seu controle.

━━━━━━━━━━━━━━━━━━━━━━━━

LEMBRETE PASSIVO: NO CLAUDE.AI, OU EM TODO LUGAR

O que não se vê, se esquece. Um cartão discreto e arrastável lembra você do seu foco atual e do próximo passo. No claude.ai ele aparece por padrão quando você abre uma nova conversa, exatamente o momento em que a troca de contexto acontece. Ative "lembrete em todos os sites" na página de Opções e ele vai seguir você até o e-mail, as redes sociais, os sites de vídeo: onde a atenção realmente escapa.

Pode ser fechado com um clique. O conteúdo da página nunca é lido.

━━━━━━━━━━━━━━━━━━━━━━━━

O QUE O AIRLOCK NÃO FAZ

• Nenhuma notificação para te interromper
• Nenhuma gamificação, nenhuma sequência, nenhuma pontuação
• Nenhum controle de tempo
• Nenhum relatório de produtividade
• Nenhuma IA reorganizando suas prioridades por você

As decisões continuam sendo suas. O Airlock só te obriga a tomar uma.

━━━━━━━━━━━━━━━━━━━━━━━━

IDIOMA

20 idiomas: inglês, chinês simplificado, hindi, espanhol, francês, árabe, bengali, português do Brasil, russo, urdu, indonésio, alemão, japonês, swahili, marata, telugo, turco, tâmil, vietnamita e coreano, com layout da direita para a esquerda para árabe e urdu. O Airlock segue o idioma do seu navegador por padrão; escolha outro no botão de bandeira no popup ou na página de Opções, e ele muda em tudo de uma vez, sem recarregar.

As traduções foram geradas automaticamente. Se uma frase soar estranha no seu idioma, você pode corrigi-la linha por linha no site do projeto: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

ATALHO

Ctrl+Shift+E por padrão (Cmd+Shift+E no Mac), alterável em chrome://extensions/shortcuts. Se essa combinação já estiver em uso na sua máquina, o Chrome não a atribui: o Airlock te avisa (página de Opções na instalação, selo "!" no ícone) e te leva até a configuração certa. Enquanto isso, um clique no ícone faz o mesmo.

━━━━━━━━━━━━━━━━━━━━━━━━

Código aberto, licença MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Sobre o aviso de instalação
Se a Navegação segura avançada do Chrome estiver ativada, você pode ver "Esta extensão não é confiável pela Navegação segura avançada". Isso está relacionado à conta de desenvolvedor ser nova, não ao Airlock em si, que já foi revisado e aprovado pela Chrome Web Store. A mensagem vai desaparecer por conta própria em alguns meses. Você pode clicar com segurança em "Continuar com a instalação".
```

---

## Русский (ru)

**Name** (45 characters max): `Airlock: Захват и приоритизация`

**Short description** (132 characters max): `Шлюз между импульсом и действием. Зафиксируй идею, а не бросайся в неё. 100% локально, никакой телеметрии.`

**Detailed description:**

```text
Ты работаешь. Появляется идея. Ты сразу бросаешься в неё. Два часа спустя понимаешь, что упустил что-то более срочное.

Airlock создаёт буферную зону между импульсом и действием. Он сделан прежде всего для людей с СДВГ: идея появляется, кажется срочной, и к тому моменту, когда ты всплываешь обратно, то, чем ты занимался, уже исчезло.

━━━━━━━━━━━━━━━━━━━━━━━━

КАК ЭТО РАБОТАЕТ

Ctrl+Shift+E (Cmd+Shift+E на Mac) из любой вкладки. Напиши импульс. Enter.

• Если у тебя пока нет фокуса, импульс становится твоим фокусом.
• Если фокус уже есть, Airlock задаёт единственный важный вопрос: идёт ли это первым?

Три возможных ответа:
→ переключить: новый импульс становится фокусом, старый уходит в очередь
→ в очередь: он ждёт своей очереди, твой текущий фокус сохраняется
→ отложить: отброшено, и это совершенно нормально

Клавиши 1, 2 и 3 отвечают без помощи мыши. Если ты закроешь всплывающее окно, не ответив, импульс сохранится, и значок «?» на иконке будет ждать тебя.

Когда ты заканчиваешь фокус, один клик по ✓ отправляет его в архив, и первый пункт очереди автоматически занимает его место. Промахнулся кликом? Любое удаление можно отменить в течение нескольких секунд.

Всплывающее окно показывает первые десять идей из очереди. Дальше один клик открывает широкий вид: весь Airlock, во весь экран в отдельной вкладке, каждая идея на виду, синхронно со всплывающим окном.

━━━━━━━━━━━━━━━━━━━━━━━━

СТРАЖ ФОКУСА

Переключение с незавершённого фокуса - вот как день рассыпается на кусочки. Поэтому, когда ты выбираешь «переключить», Airlock сначала спрашивает: завершён ли твой текущий фокус? Да: он уходит в архив, и новая идея берёт верх. Ещё нет: Airlock предлагает поставить новую идею в очередь и держит в запасе более тихий вариант «всё равно переключить» для случаев, когда ты действительно так решил.

Вопрос пропускается, если новая идея явно о том же самом. Эта проверка выполняется только на твоём компьютере: встроенной локальной моделью ИИ Chrome, если твой компьютер её поддерживает (английский, испанский, японский, немецкий, французский), иначе - сравнением слов двух идей. Никуда ничего не отправляется. Ты можешь отключить стража или изменить его чувствительность на странице настроек.

━━━━━━━━━━━━━━━━━━━━━━━━

ЗАСТРЯЛ НА «С ЧЕГО НАЧАТЬ?»

Разбей свой фокус на маленькие, конкретные шаги, первый из которых выполним менее чем за десять минут. Следующий шаг появится под твоим фокусом: во всплывающем окне, в подсказке значка и на карточке напоминания. Никакого ИИ не требуется; необязательный локальный мост с Claude Code может набросать шаги за тебя, на языке твоего интерфейса.

━━━━━━━━━━━━━━━━━━━━━━━━

ЧЕМ ЭТО ОТЛИЧАЕТСЯ

Трение - вот что убивает инструменты продуктивности. Если, чтобы зафиксировать мысль, нужно открыть приложение, выбрать проект и заполнить три поля, ты этого не сделаешь. Ты просто бросишься в импульс.

Airlock живёт внутри Chrome, открывается с клавиатуры и просит только одно: текст импульса. Никакого проекта для выбора, никакого срока, никакого приоритета для назначения, никакого аккаунта для создания.

Это не менеджер задач. Это шлюз.

━━━━━━━━━━━━━━━━━━━━━━━━

ТВОИ ДАННЫЕ ОСТАЮТСЯ НА МЕСТЕ

• 100% локальное хранение через chrome.storage.local
• Без сервера, без аккаунта, без синхронизации
• Без телеметрии, без аналитики, без слежки, даже «анонимной»
• Минимальные разрешения при установке; доступ к другим сайтам запрашивается только если ты включишь напоминание повсюду
• Одно исключение, и только если ты сам его включишь: «Создать с Claude» отправляет текст одного импульса в Claude Code, установленный на твоём компьютере под твоим собственным аккаунтом. Никогда очередь, никогда историю.

Страница настроек позволяет в любой момент экспортировать твои данные в JSON и импортировать их обратно. Резервная копия остаётся под твоим контролем.

━━━━━━━━━━━━━━━━━━━━━━━━

ПАССИВНОЕ НАПОМИНАНИЕ: НА CLAUDE.AI ИЛИ ВЕЗДЕ

С глаз - из сердца. Скромная, перемещаемая карточка напоминает тебе о текущем фокусе и его следующем шаге. На claude.ai она по умолчанию появляется при открытии нового разговора - именно в тот момент, когда происходит переключение контекста. Включи «напоминание на каждом сайте» на странице настроек, и она последует за тобой в почту, соцсети, видеосайты: куда угодно, где внимание и правда рассеивается.

Закрывается одним кликом. Содержимое страницы никогда не читается.

━━━━━━━━━━━━━━━━━━━━━━━━

ЧЕГО AIRLOCK НЕ ДЕЛАЕТ

• Никаких уведомлений, которые тебя прерывают
• Никакой геймификации, никаких серий, никаких очков
• Никакого учёта времени
• Никаких отчётов о продуктивности
• Никакого ИИ, который переставляет твои приоритеты за тебя

Решения остаются твоими. Airlock лишь заставляет тебя принять одно.

━━━━━━━━━━━━━━━━━━━━━━━━

ЯЗЫК

20 языков: английский, упрощённый китайский, хинди, испанский, французский, арабский, бенгальский, бразильский португальский, русский, урду, индонезийский, немецкий, японский, суахили, маратхи, телугу, турецкий, тамильский, вьетнамский и корейский, с раскладкой справа налево для арабского и урду. По умолчанию Airlock следует языку твоего браузера; выбери другой с помощью кнопки с флагом во всплывающем окне или на странице настроек, и он переключится повсюду сразу, без перезагрузки.

Переводы были созданы автоматически. Если фраза на твоём языке звучит неправильно, ты можешь исправить её строка за строкой на сайте проекта: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

СОЧЕТАНИЕ КЛАВИШ

По умолчанию Ctrl+Shift+E (Cmd+Shift+E на Mac), меняется в chrome://extensions/shortcuts. Если эта комбинация уже занята на твоём компьютере, Chrome не привязывает её: Airlock сообщает тебе об этом (страница настроек при установке, значок «!» на иконке) и приводит тебя к нужной настройке. Пока же один клик по значку делает то же самое.

━━━━━━━━━━━━━━━━━━━━━━━━

Открытый исходный код, лицензия MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

О предупреждении при установке
Если у тебя включён Enhanced Safe Browsing в Chrome, ты можешь увидеть предупреждение о том, что это расширение не считается надёжным в Enhanced Safe Browsing. Причина - новый аккаунт разработчика, а не сам Airlock, который прошёл проверку и был одобрен Chrome Web Store. Сообщение исчезнет само по себе в течение нескольких месяцев. Можешь спокойно продолжить установку.
```

---

## اردو (ur)

**Name** (45 characters max): `Airlock: پکڑیں اور ترجیح دیں`

**Short description** (132 characters max): `خیال اور عمل کے درمیان ایک ایئر لاک۔ خیال میں ڈوبنے کے بجائے اسے پکڑ لیں۔ 100% مقامی، صفر ٹیلی میٹری۔`

**Detailed description:**

```text
آپ کام کر رہے ہیں۔ ایک خیال آتا ہے۔ آپ سیدھے اس میں ڈوب جاتے ہیں۔ دو گھنٹے بعد آپ کو احساس ہوتا ہے کہ آپ نے کوئی زیادہ ضروری چیز چھوڑ دی۔

Airlock خیال اور عمل کے درمیان ایک بفر زون رکھتا ہے۔ یہ پہلے ADHD والے لوگوں کے لیے ڈیزائن کیا گیا ہے: ایک خیال آتا ہے، وہ فوری لگتا ہے، اور جب تک آپ اس سے باہر آتے ہیں، جو کام آپ کر رہے تھے وہ غائب ہو چکا ہوتا ہے۔

━━━━━━━━━━━━━━━━━━━━━━━━

یہ کیسے کام کرتا ہے

کسی بھی ٹیب سے Ctrl+Shift+E (Mac پر Cmd+Shift+E)۔ خیال لکھیں۔ Enter۔

• اگر آپ کی کوئی موجودہ توجہ نہیں ہے، تو خیال آپ کی توجہ بن جاتا ہے۔
• اگر آپ کی پہلے سے کوئی توجہ ہے، تو Airlock وہ ایک ہی اہم سوال پوچھتا ہے: کیا یہ پہلے جائے؟

تین ممکنہ جوابات:
→ بدلیں: نیا خیال توجہ بن جاتا ہے، پرانا قطار میں چلا جاتا ہے
→ قطار: یہ اپنی باری کا انتظار کرتا ہے، آپ کی موجودہ توجہ برقرار رہتی ہے
→ چھوڑ دیں: مسترد کر دیا جاتا ہے، اور یہ بالکل ٹھیک ہے

چابیاں 1، 2 اور 3 ماؤس کو چھوئے بغیر جواب دیتی ہیں۔ اگر آپ جواب دینے سے پہلے پاپ اپ بند کر دیں، تو خیال محفوظ رہتا ہے اور آئیکن پر ایک "؟" آپ کا انتظار کرتا ہے۔

جب آپ کسی توجہ کو ختم کرتے ہیں، تو ✓ پر ایک کلک اسے آرکائیو کر دیتا ہے اور قطار میں موجود پہلی چیز خود بخود اس کی جگہ لے لیتی ہے۔ غلطی سے کلک ہو گیا؟ ہر حذف کو چند سیکنڈ کے لیے واپس کیا جا سکتا ہے۔

پاپ اپ قطار کے پہلے دس خیالات دکھاتا ہے۔ اس کے بعد، ایک کلک وائیڈ ویو کھولتا ہے: پورا Airlock، ایک ٹیب میں فل اسکرین پر، ہر خیال نظر میں، پاپ اپ کے ساتھ ہم آہنگ۔

━━━━━━━━━━━━━━━━━━━━━━━━

توجہ کا محافظ

کسی نامکمل توجہ سے ہٹنا ہی وہ چیز ہے جو دن کو بکھیر دیتی ہے۔ اس لیے جب آپ "بدلیں" چُنتے ہیں، تو Airlock پہلے پوچھتا ہے: کیا آپ کی موجودہ توجہ مکمل ہو گئی؟ ہاں: یہ آرکائیو ہو جاتی ہے اور نیا خیال اس کی جگہ لے لیتا ہے۔ ابھی نہیں: Airlock نئے خیال کو قطار میں رکھنے کی تجویز دیتا ہے، اور جب آپ واقعی ایسا چاہیں تو ایک خاموش "پھر بھی بدلیں" کا آپشن بھی رکھتا ہے۔

اگر نیا خیال واضح طور پر وہی موضوع ہو تو سوال چھوڑ دیا جاتا ہے۔ یہ جانچ صرف آپ کے کمپیوٹر پر ہوتی ہے: اگر آپ کا کمپیوٹر معاونت کرتا ہو تو Chrome کے بلٹ اِن مقامی AI ماڈل کے ساتھ (انگریزی، ہسپانوی، جاپانی، جرمن، فرانسیسی)، ورنہ دونوں خیالوں کے الفاظ موازنہ کر کے۔ کچھ بھی کہیں نہیں بھیجا جاتا۔ آپ آپشنز کے صفحے پر محافظ کو بند کر سکتے ہیں یا اس کی حساسیت بدل سکتے ہیں۔

━━━━━━━━━━━━━━━━━━━━━━━━

"کہاں سے شروع کریں؟" میں پھنس گئے؟

اپنی توجہ کو چھوٹے، ٹھوس قدموں میں تقسیم کریں، پہلا قدم 10 منٹ سے کم میں کیا جا سکے۔ پھر اگلا قدم آپ کی توجہ کے نیچے، پاپ اپ میں، آئیکن ٹول ٹپ پر اور یاد دہانی کارڈ میں ظاہر ہوتا ہے۔ کسی AI کی ضرورت نہیں؛ ایک اختیاری مقامی Claude Code برج آپ کی انٹرفیس زبان میں آپ کے لیے قدم تیار کر سکتا ہے۔

━━━━━━━━━━━━━━━━━━━━━━━━

یہ کیوں مختلف ہے

فرکشن ہی وہ چیز ہے جو پروڈکٹیویٹی ٹولز کو مار دیتی ہے۔ اگر کسی خیال کو پکڑنے کا مطلب ایک ایپ کھولنا، ایک پراجیکٹ چننا اور تین فیلڈز بھرنا ہو، تو آپ یہ نہیں کریں گے۔ آپ اس کے بجائے خیال میں ڈوب جائیں گے۔

Airlock Chrome میں رہتا ہے، کی بورڈ سے کھلتا ہے، اور صرف ایک ہی چیز مانگتا ہے: خیال کا متن۔ چننے کے لیے کوئی پراجیکٹ نہیں، کوئی ڈیو ڈیٹ نہیں، تفویض کرنے کے لیے کوئی ترجیح نہیں، بنانے کے لیے کوئی اکاؤنٹ نہیں۔

یہ ٹاسک مینیجر نہیں ہے۔ یہ ایک ایئر لاک ہے۔

━━━━━━━━━━━━━━━━━━━━━━━━

آپ کا ڈیٹا وہیں رہتا ہے

• chrome.storage.local کے ذریعے 100% مقامی اسٹوریج
• نہ سرور، نہ اکاؤنٹ، نہ سنک
• نہ ٹیلی میٹری، نہ اینالیٹکس، نہ ٹریکنگ، "گمنام" بھی نہیں
• انسٹال کے وقت کم از کم اجازتیں؛ دیگر سائٹس تک رسائی صرف اس وقت مانگی جاتی ہے جب آپ ہر سائٹ پر یاد دہانی آن کریں
• ایک استثنا، اور وہ بھی صرف اس وقت جب آپ خود اسے آن کریں: "Claude سے تیار کریں" ایک خیال کا متن، آپ کے اپنے اکاؤنٹ کے تحت آپ کے کمپیوٹر پر نصب Claude Code کو بھیجتا ہے۔ نہ قطار، نہ تاریخ، کبھی نہیں۔

ایک آپشنز کا صفحہ آپ کو کسی بھی وقت اپنا ڈیٹا JSON کے طور پر ایکسپورٹ کرنے، اور اسے واپس امپورٹ کرنے دیتا ہے۔ بیک اپ آپ کے کنٹرول میں رہتا ہے۔

━━━━━━━━━━━━━━━━━━━━━━━━

غیر فعال یاد دہانی: CLAUDE.AI پر، یا ہر جگہ

نظر سے دور، دل سے دور۔ ایک مختصر، گھسیٹا جا سکنے والا کارڈ آپ کو آپ کی موجودہ توجہ اور اس کے اگلے قدم کی یاد دلاتا ہے۔ claude.ai پر یہ بطور ڈیفالٹ تب ظاہر ہوتا ہے جب آپ نئی گفتگو کھولتے ہیں، بالکل اسی لمحے جب context-switching ہوتی ہے۔ آپشنز کے صفحے پر "ہر سائٹ پر یاد دہانی" آن کریں اور یہ آپ کے ساتھ ای میل، سوشل میڈیا، ویڈیو سائٹس تک جاتا ہے: جہاں کہیں بھی دھیان واقعی بھٹک جاتا ہے۔

ایک کلک میں بند کیا جا سکتا ہے۔ صفحے کا مواد کبھی نہیں پڑھا جاتا۔

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock کیا نہیں کرتا

• آپ کو مداخلت کرنے والی کوئی اطلاعات نہیں
• نہ گیمیفیکیشن، نہ لگاتار سلسلے، نہ اسکور
• کوئی ٹائم ٹریکنگ نہیں
• کوئی پروڈکٹیویٹی رپورٹس نہیں
• آپ کی ترجیحات کو از خود ترتیب دینے والا کوئی AI نہیں

فیصلے آپ کے ہی رہتے ہیں۔ Airlock صرف آپ کو ایک فیصلہ کرنے پر مجبور کرتا ہے۔

━━━━━━━━━━━━━━━━━━━━━━━━

زبان

20 زبانیں: انگریزی، آسان چینی، ہندی، ہسپانوی، فرانسیسی، عربی، بنگالی، برازیلی پرتگالی، روسی، اردو، انڈونیشیائی، جرمن، جاپانی، سواحلی، مراٹھی، تیلگو، ترکی، تمل، ویتنامی اور کورین، عربی اور اردو کے لیے دائیں سے بائیں لے آؤٹ کے ساتھ۔ Airlock بطور ڈیفالٹ آپ کے براؤزر کی زبان کی پیروی کرتا ہے؛ پاپ اپ میں یا آپشنز کے صفحے میں فلیگ بٹن سے کوئی اور زبان چُن لیں، یہ بغیر دوبارہ لوڈ کے ہر جگہ ایک ساتھ بدل جاتی ہے۔

ترجمے خودکار طور پر تیار کیے گئے ہیں۔ اگر آپ کی زبان میں کوئی جملہ غلط لگے، تو آپ اسے پراجیکٹ کی ویب سائٹ پر سطر بہ سطر درست کر سکتے ہیں: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

شارٹ کٹ

بطور ڈیفالٹ Ctrl+Shift+E (Mac پر Cmd+Shift+E)، chrome://extensions/shortcuts پر بدلا جا سکتا ہے۔ اگر وہ کومبینیشن آپ کے کمپیوٹر پر پہلے سے لی گئی ہے، تو Chrome اسے منسلک نہیں کرتا: Airlock آپ کو بتاتا ہے (انسٹال کے وقت آپشنز کا صفحہ، آئیکن پر "!" بیج) اور آپ کو صحیح سیٹنگ تک لے جاتا ہے۔ اس دوران، آئیکن پر ایک کلک وہی کام کرتا ہے۔

━━━━━━━━━━━━━━━━━━━━━━━━

اوپن سورس، MIT لائسنس: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

انسٹال وارننگ کے بارے میں
اگر Chrome کی Enhanced Safe Browsing آن ہے، تو آپ کو "This extension is not trusted by Enhanced Safe Browsing" نظر آ سکتا ہے۔ یہ Airlock کے بارے میں نہیں ہے، بلکہ ڈیولپر اکاؤنٹ کے نئے ہونے کے بارے میں ہے؛ Airlock کا Chrome Web Store کے ذریعے جائزہ لیا گیا اور منظوری دی گئی ہے۔ یہ پیغام چند مہینوں میں خود بخود ختم ہو جائے گا۔ "Continue to install" پر کلک کرنا محفوظ ہے۔
```

---

## Bahasa Indonesia (id)

**Name** (45 characters max): `Airlock: Tangkap dan prioritaskan`

**Short description** (132 characters max): `Sebuah airlock antara impuls dan tindakan. Catat idenya daripada langsung terjun ke dalamnya. 100% lokal, tanpa telemetri.`

**Detailed description:**

```text
Kamu sedang bekerja. Sebuah ide muncul. Kamu langsung terjun ke dalamnya. Dua jam kemudian kamu sadar sudah melewatkan sesuatu yang lebih mendesak.

Airlock menciptakan zona penyangga antara impuls dan tindakan. Dirancang pertama-tama untuk orang dengan ADHD: sebuah ide muncul, terasa mendesak, dan begitu kamu kembali fokus, apa yang sedang kamu kerjakan sudah hilang.

━━━━━━━━━━━━━━━━━━━━━━━━

CARA KERJANYA

Ctrl+Shift+E (Cmd+Shift+E di Mac) dari tab mana saja. Ketik idenya. Enter.

• Jika kamu belum punya fokus saat ini, impuls itu menjadi fokusmu.
• Jika kamu sudah punya fokus, Airlock mengajukan satu-satunya pertanyaan yang penting: apakah ini lebih penting?

Tiga jawaban yang mungkin:
→ ganti: impuls baru menjadi fokus, yang lama masuk ke antrean
→ antre: ia menunggu gilirannya, fokusmu saat ini tetap terjaga
→ lepas: dibuang, dan itu sama sekali tidak masalah

Tombol 1, 2, dan 3 menjawab tanpa menyentuh mouse. Jika kamu menutup popup sebelum menjawab, impuls tetap tersimpan dan tanda "?" di ikon menunggumu.

Saat kamu menyelesaikan sebuah fokus, satu klik pada ✓ mengarsipkannya dan item pertama di antrean otomatis mengambil alih. Salah klik? Setiap penghapusan bisa diurungkan selama beberapa detik.

Popup menampilkan sepuluh ide pertama di antrean. Lebih dari itu, satu klik membuka tampilan luas: seluruh Airlock, layar penuh di satu tab, setiap ide terlihat, tetap sinkron dengan popup.

━━━━━━━━━━━━━━━━━━━━━━━━

PENJAGA FOKUS

Beralih dari fokus yang belum selesai adalah cara hari berantakan. Jadi saat kamu memilih "ganti", Airlock bertanya dulu: apakah fokusmu saat ini sudah selesai? Ya: fokus itu diarsipkan dan ide baru mengambil alih. Belum: Airlock menyarankan untuk menyimpan ide baru itu di antrean, sambil tetap menyediakan "tetap ganti" yang lebih diam-diam untuk saat kamu benar-benar menginginkannya.

Pertanyaan ini dilewati jika ide baru jelas membahas topik yang sama. Pemeriksaan ini hanya berjalan di perangkatmu sendiri: dengan model AI lokal bawaan Chrome jika komputermu mendukung (bahasa Inggris, Spanyol, Jepang, Jerman, Prancis), atau jika tidak, dengan membandingkan kata-kata dari kedua ide. Tidak ada yang dikirim ke mana pun. Kamu bisa mematikan penjaga ini atau mengubah sensitivitasnya di halaman Opsi.

━━━━━━━━━━━━━━━━━━━━━━━━

BINGUNG "HARUS MULAI DARI MANA?"

Pecah fokusmu menjadi langkah-langkah kecil dan konkret, langkah pertama bisa dilakukan dalam kurang dari sepuluh menit. Langkah berikutnya lalu muncul di bawah fokusmu, di popup, di tooltip ikon, dan di kartu pengingat. Tidak perlu AI; jembatan opsional dan lokal dengan Claude Code bisa menyusun langkah-langkahnya untukmu, dalam bahasa antarmukamu.

━━━━━━━━━━━━━━━━━━━━━━━━

MENGAPA INI BERBEDA

Friksi adalah yang membunuh alat produktivitas. Jika mencatat sebuah pikiran berarti membuka aplikasi, memilih proyek, dan mengisi tiga kolom, kamu tidak akan melakukannya. Kamu akan langsung terjun ke impuls itu.

Airlock hidup di Chrome, terbuka dari keyboard, dan hanya meminta satu hal: teks dari impuls itu. Tidak ada proyek untuk dipilih, tidak ada tanggal jatuh tempo, tidak ada prioritas untuk ditentukan, tidak ada akun untuk dibuat.

Ini bukan pengelola tugas. Ini adalah airlock.

━━━━━━━━━━━━━━━━━━━━━━━━

DATAMU TETAP DI TEMPATNYA

• Penyimpanan 100% lokal melalui chrome.storage.local
• Tanpa server, tanpa akun, tanpa sinkronisasi
• Tanpa telemetri, tanpa analitik, tanpa pelacakan, bahkan yang "anonim" pun tidak
• Izin minimal saat instalasi; akses ke situs lain hanya diminta jika kamu mengaktifkan pengingat di semua situs
• Satu pengecualian, dan hanya jika kamu sendiri mengaktifkannya: "Buat dengan Claude" mengirim teks dari satu impuls ke Claude Code, yang terpasang di perangkatmu dengan akunmu sendiri. Tidak pernah antrean, tidak pernah riwayat.

Halaman Opsi memungkinkanmu mengekspor datamu sebagai JSON kapan saja, dan mengimpornya kembali. Cadangan tetap berada di bawah kendalimu.

━━━━━━━━━━━━━━━━━━━━━━━━

PENGINGAT PASIF: DI CLAUDE.AI, ATAU DI MANA SAJA

Yang tidak terlihat, mudah terlupakan. Kartu diskret yang bisa digeser mengingatkanmu pada fokusmu saat ini dan langkah berikutnya. Di claude.ai, kartu ini muncul secara default saat kamu membuka percakapan baru, tepat saat context-switching terjadi. Aktifkan "pengingat di semua situs" di halaman Opsi dan kartu ini akan mengikutimu ke email, media sosial, situs video: di mana pun perhatian benar-benar teralihkan.

Bisa ditutup dengan satu klik. Isi halaman tidak pernah dibaca.

━━━━━━━━━━━━━━━━━━━━━━━━

APA YANG TIDAK DILAKUKAN AIRLOCK

• Tidak ada notifikasi yang mengganggumu
• Tidak ada gamifikasi, tidak ada rentetan, tidak ada skor
• Tidak ada pelacakan waktu
• Tidak ada laporan produktivitas
• Tidak ada AI yang mengatur ulang prioritasmu untukmu

Keputusan tetap di tanganmu. Airlock hanya memaksamu untuk membuat satu keputusan.

━━━━━━━━━━━━━━━━━━━━━━━━

BAHASA

20 bahasa: Inggris, Tionghoa Sederhana, Hindi, Spanyol, Prancis, Arab, Bengali, Portugis Brasil, Rusia, Urdu, Indonesia, Jerman, Jepang, Swahili, Marathi, Telugu, Turki, Tamil, Vietnam, dan Korea, dengan tata letak kanan-ke-kiri untuk Arab dan Urdu. Airlock mengikuti bahasa browsermu secara default; pilih bahasa lain dari tombol bendera di popup atau di halaman Opsi, dan bahasa berubah di semua tempat sekaligus, tanpa memuat ulang.

Terjemahan ini dibuat secara otomatis. Jika sebuah kalimat terdengar aneh dalam bahasamu, kamu bisa memperbaikinya baris demi baris di situs proyek ini: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

PINTASAN

Ctrl+Shift+E secara default (Cmd+Shift+E di Mac), bisa diubah di chrome://extensions/shortcuts. Jika kombinasi itu sudah dipakai di perangkatmu, Chrome tidak akan mengaitkannya: Airlock memberitahumu (halaman Opsi saat instalasi, lencana "!" di ikon) dan membawamu ke pengaturan yang tepat. Sementara itu, satu klik pada ikon melakukan hal yang sama.

━━━━━━━━━━━━━━━━━━━━━━━━

Sumber terbuka, lisensi MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Tentang peringatan instalasi
Jika Enhanced Safe Browsing Chrome aktif, kamu mungkin melihat pesan "Ekstensi ini tidak dipercaya oleh Enhanced Safe Browsing". Ini terkait dengan akun developer yang masih baru, bukan dengan Airlock itu sendiri, yang sudah ditinjau dan disetujui oleh Chrome Web Store. Pesan ini akan hilang sendiri dalam beberapa bulan. Kamu bisa mengklik "Continue to install" dengan aman.
```

---

## Deutsch (de)

**Name** (45 characters max): `Airlock: Erfassen & priorisieren`

**Short description** (132 characters max): `Eine Schleuse zwischen Impuls und Handlung. Erfasse die Idee, statt dich hineinzustürzen. 100% lokal, keine Telemetrie.`

**Detailed description:**

```text
Du arbeitest. Eine Idee taucht auf. Du stürzt dich direkt hinein. Zwei Stunden später merkst du, dass du etwas Dringenderes fallen gelassen hast.

Airlock legt eine Pufferzone zwischen den Impuls und die Handlung. Es ist in erster Linie für Menschen mit ADHS gemacht: Eine Idee taucht auf, fühlt sich dringend an, und wenn du wieder auftauchst, ist das, was du gerade gemacht hast, verschwunden.

━━━━━━━━━━━━━━━━━━━━━━━━

SO FUNKTIONIERT ES

Ctrl+Shift+E (Cmd+Shift+E auf dem Mac) aus jedem Tab. Den Impuls eintippen. Enter.

• Hast du gerade keinen Fokus, wird der Impuls zu deinem Fokus.
• Hast du schon einen Fokus, stellt Airlock die einzige Frage, die zählt: geht das vor?

Drei mögliche Antworten:
→ wechseln: der neue Impuls wird zum Fokus, der alte wandert in die Warteschlange
→ einreihen: er wartet, bis er an der Reihe ist, dein aktueller Fokus bleibt erhalten
→ loslassen: verworfen, und das ist völlig in Ordnung

Die Tasten 1, 2 und 3 beantworten das ohne die Maus. Schließt du das Popup, bevor du antwortest, bleibt der Impuls erhalten, und ein „?“ auf dem Symbol wartet auf dich.

Beendest du einen Fokus, archiviert ein Klick auf ✓ ihn, und der erste Eintrag der Warteschlange nimmt automatisch seinen Platz ein. Falsch geklickt? Jede Entfernung lässt sich ein paar Sekunden lang rückgängig machen.

Das Popup zeigt die ersten zehn Ideen der Warteschlange. Darüber hinaus öffnet ein Klick die breite Ansicht: der ganze Airlock, im Vollbild in einem Tab, jede Idee im Blick, synchron mit dem Popup.

━━━━━━━━━━━━━━━━━━━━━━━━

FOKUS-WÄCHTER

Von einem nicht erledigten Fokus wegzuwechseln, ist es, wie der Tag zerfällt. Wählst du also „wechseln“, fragt Airlock zuerst: ist dein aktueller Fokus erledigt? Ja: er wird archiviert, und die neue Idee übernimmt. Noch nicht: Airlock schlägt vor, die neue Idee in der Warteschlange zu parken, und hält ein unauffälligeres „trotzdem wechseln“ für die Fälle bereit, in denen du es wirklich so meinst.

Die Frage wird übersprungen, wenn die neue Idee klar zum gleichen Thema gehört. Diese Prüfung läuft ausschließlich auf deinem Rechner: mit Chromes eingebautem lokalem KI-Modell, wenn dein Computer es unterstützt (Englisch, Spanisch, Japanisch, Deutsch, Französisch), sonst durch Vergleich der Wörter beider Ideen. Nichts wird irgendwohin gesendet. Du kannst den Wächter in den Optionen ausschalten oder seine Empfindlichkeit ändern.

━━━━━━━━━━━━━━━━━━━━━━━━

FESTGEFAHREN BEI „WO FANGE ICH AN?“

Zerlege deinen Fokus in kleine, konkrete Schritte, der erste davon machbar in unter zehn Minuten. Der nächste Schritt erscheint dann unter deinem Fokus: im Popup, in der Symbol-Tooltipp und auf der Erinnerungskarte. Keine KI nötig; eine optionale lokale Claude-Code-Brücke kann die Schritte für dich entwerfen, in deiner Oberflächensprache.

━━━━━━━━━━━━━━━━━━━━━━━━

WARUM DAS ANDERS IST

Reibung ist es, was Produktivitätstools tötet. Bedeutet das Erfassen eines Gedankens, eine App zu öffnen, ein Projekt auszuwählen und drei Felder auszufüllen, wirst du es nicht tun. Du wirst dich stattdessen in den Impuls stürzen.

Airlock lebt in Chrome, öffnet sich über die Tastatur und verlangt nur eine Sache: den Text des Impulses. Kein Projekt zum Auswählen, kein Fälligkeitsdatum, keine Priorität zum Zuweisen, kein Konto zum Erstellen.

Das ist kein Aufgabenmanager. Es ist eine Schleuse.

━━━━━━━━━━━━━━━━━━━━━━━━

DEINE DATEN BLEIBEN, WO SIE SIND

• 100% lokale Speicherung über chrome.storage.local
• Kein Server, kein Konto, keine Synchronisierung
• Keine Telemetrie, keine Analyse, kein Tracking, nicht einmal „anonymisiert“
• Minimale Berechtigungen bei der Installation; Zugriff auf andere Websites wird nur angefragt, wenn du die Erinnerung überall aktivierst
• Eine Ausnahme, und nur wenn du sie selbst aktivierst: „Mit Claude erstellen“ sendet den Text eines einzelnen Impulses an Claude Code, installiert auf deinem Rechner unter deinem eigenen Konto. Niemals die Warteschlange, niemals den Verlauf.

Eine Optionsseite erlaubt es dir, deine Daten jederzeit als JSON zu exportieren und wieder zu importieren. Die Sicherung bleibt unter deiner Kontrolle.

━━━━━━━━━━━━━━━━━━━━━━━━

PASSIVE ERINNERUNG: AUF CLAUDE.AI ODER ÜBERALL

Aus den Augen, aus dem Sinn. Eine dezente, verschiebbare Karte erinnert dich an deinen aktuellen Fokus und seinen nächsten Schritt. Auf claude.ai erscheint sie standardmäßig, wenn du eine neue Unterhaltung öffnest, genau in dem Moment, in dem der Kontextwechsel passiert. Aktiviere „Erinnerung auf jeder Seite“ in den Optionen, und sie folgt dir zu E-Mails, sozialen Netzwerken, Videoseiten: überall dort, wo die Aufmerksamkeit tatsächlich entschwindet.

Mit einem Klick zu schließen. Der Seiteninhalt wird nie gelesen.

━━━━━━━━━━━━━━━━━━━━━━━━

WAS AIRLOCK NICHT TUT

• Keine Benachrichtigungen, die dich unterbrechen
• Keine Gamification, keine Serien, keine Punktzahl
• Keine Zeiterfassung
• Keine Produktivitätsberichte
• Keine KI, die deine Prioritäten für dich umsortiert

Die Entscheidungen bleiben deine. Airlock zwingt dich nur dazu, eine zu treffen.

━━━━━━━━━━━━━━━━━━━━━━━━

SPRACHE

20 Sprachen: Englisch, vereinfachtes Chinesisch, Hindi, Spanisch, Französisch, Arabisch, Bengalisch, brasilianisches Portugiesisch, Russisch, Urdu, Indonesisch, Deutsch, Japanisch, Swahili, Marathi, Telugu, Türkisch, Tamil, Vietnamesisch und Koreanisch, mit Rechts-nach-links-Layout für Arabisch und Urdu. Airlock folgt standardmäßig deiner Browsersprache; wähle eine andere über die Flaggen-Schaltfläche im Popup oder in den Optionen, und sie wechselt überall gleichzeitig, ohne Neuladen.

Die Übersetzungen wurden automatisch erstellt. Klingt ein Satz in deiner Sprache falsch, kannst du ihn Zeile für Zeile auf der Projektwebsite korrigieren: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

KÜRZEL

Standardmäßig Ctrl+Shift+E (Cmd+Shift+E auf dem Mac), änderbar unter chrome://extensions/shortcuts. Ist diese Kombination auf deinem Rechner bereits belegt, bindet Chrome sie nicht: Airlock sagt dir das (Optionsseite bei der Installation, „!“-Badge auf dem Symbol) und führt dich zur richtigen Einstellung. In der Zwischenzeit tut ein Klick auf das Symbol dasselbe.

━━━━━━━━━━━━━━━━━━━━━━━━

Open Source, MIT-Lizenz: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Über die Installationswarnung
Ist Chromes Enhanced Safe Browsing aktiviert, siehst du möglicherweise eine Warnung, dass diese Erweiterung von Enhanced Safe Browsing nicht als vertrauenswürdig eingestuft wird. Das liegt am neuen Entwicklerkonto, nicht an Airlock selbst, das vom Chrome Web Store geprüft und freigegeben wurde. Die Meldung verschwindet von selbst innerhalb einiger Monate. Du kannst die Installation bedenkenlos fortsetzen.
```

---

## 日本語 (ja)

**Name** (45 characters max): `Airlock：捕捉と優先順位付け`

**Short description** (132 characters max): `衝動と行動の間に設けるエアロック。アイデアに飛び込む代わりに、まず記録しましょう。100% ローカル、テレメトリーなし。`

**Detailed description:**

```text
仕事をしている。アイデアが浮かぶ。あなたはすぐにそれに飛び込む。2時間後、もっと緊急な何かを見落としていたことに気づく。

Airlock は衝動と行動の間にバッファーゾーンを設けます。これはまず ADHD のある人のために設計されました：アイデアが浮かび、それは緊急に感じられ、そこから浮かび上がる頃には、さっきまでやっていたことは消えてしまっています。

━━━━━━━━━━━━━━━━━━━━━━━━

使い方

どのタブからでも Ctrl+Shift+E（Mac では Cmd+Shift+E）。思いつきを入力。Enter。

• 現在フォーカスがない場合、その思いつきがあなたのフォーカスになります。
• すでにフォーカスがある場合、Airlock はたった一つの重要な質問をします：これを先にする？

3つの答えがあります：
→ 切り替え：新しい思いつきがフォーカスになり、古いものはキューに移動する
→ キュー：順番を待ち、現在のフォーカスはそのまま保たれる
→ 保留：見送る、それで全く問題ない

キー 1、2、3 でマウスを使わずに答えられます。答える前にポップアップを閉じても、思いつきは保存され、アイコンの「？」があなたを待っています。

フォーカスを完了したら、✓ をワンクリックするとアーカイブされ、キューの最初の項目が自動的にその場所を引き継ぎます。間違ってクリックした？どの削除も数秒以内なら元に戻せます。

ポップアップにはキューの最初の10件が表示されます。それを超えると、ワンクリックでワイドビューが開きます：Airlock のすべてがタブで全画面表示され、すべての思いつきが見渡せ、ポップアップと同期されます。

━━━━━━━━━━━━━━━━━━━━━━━━

フォーカスガード

未完了のフォーカスから離れることが、一日がバラバラになる原因です。そのため「切り替え」を選ぶと、Airlock はまず尋ねます：現在のフォーカスは完了しましたか？はい：アーカイブされ、新しいアイデアが引き継ぎます。まだ：Airlock は新しいアイデアをキューに入れることを提案し、本当にそうしたいときのために控えめな「それでも切り替える」を残しておきます。

新しいアイデアが明らかに同じテーマである場合、この質問はスキップされます。このチェックはあなたのマシン上でのみ実行されます：お使いのコンピューターが対応していれば Chrome 内蔵のローカル AI モデル（英語、スペイン語、日本語、ドイツ語、フランス語に対応）を使い、そうでなければ2つのアイデアの単語を比較します。どこにも何も送信されません。ガードはオプションページでオフにしたり、感度を変更したりできます。

━━━━━━━━━━━━━━━━━━━━━━━━

「どこから始めればいいかわからない」ときに

フォーカスを小さく具体的なステップに分解しましょう。最初のステップは10分未満でできるものにします。次のステップは、フォーカスの下に、ポップアップ、アイコンのツールチップ、リマインダーカードに表示されます。AI は不要です。任意のローカル Claude Code ブリッジを使えば、あなたのインターフェース言語でステップの下書きを作成できます。

━━━━━━━━━━━━━━━━━━━━━━━━

何が違うのか

摩擦こそが生産性ツールを殺すものです。考えを記録するのにアプリを開いて、プロジェクトを選んで、3つの項目を入力しなければならないなら、あなたはそれをしないでしょう。代わりにその思いつきに飛び込んでしまいます。

Airlock は Chrome の中で動き、キーボードから開き、求めるのはただ一つ：思いつきのテキストだけです。プロジェクトを選ぶ必要はなく、締め切りもなく、優先度を割り当てる必要もなく、アカウントを作る必要もありません。

これはタスクマネージャーではありません。エアロックです。

━━━━━━━━━━━━━━━━━━━━━━━━

データはそのまま留まる

• chrome.storage.local による100%ローカル保存
• サーバーなし、アカウントなし、同期なし
• テレメトリーなし、分析なし、追跡なし、「匿名化」されたものも含めて
• インストール時は最小限の権限のみ。他のサイトへのアクセスは、リマインダーをすべてのサイトで有効にした場合にのみ要求される
• 唯一の例外は、あなた自身がオンにした場合のみ：「Claude で生成」は、単一の思いつきのテキストを、あなたのマシンにあなた自身のアカウントでインストールされた Claude Code に送信します。キューや履歴は決して送信されません。

オプションページでは、いつでもデータを JSON としてエクスポートし、再度インポートできます。バックアップは常にあなたの管理下にあります。

━━━━━━━━━━━━━━━━━━━━━━━━

パッシブリマインダー：claude.ai 上、またはすべてのサイトで

見えないものは忘れられてしまいます。控えめでドラッグ可能なカードが、現在のフォーカスとその次のステップを知らせてくれます。claude.ai では、新しい会話を開いたときにデフォルトで表示されます。まさにコンテキストスイッチが起こる瞬間です。オプションページで「すべてのサイトでリマインダー」をオンにすると、メール、SNS、動画サイトなど、本当に注意がそれる場所にもついてきます。

ワンクリックで閉じられます。ページの内容は一切読み取られません。

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock がしないこと

• 通知で中断させない
• ゲーム化なし、連続記録なし、スコアなし
• 時間の記録なし
• 生産性レポートなし
• AI があなたの優先順位を勝手に並べ替えることはない

決定はあなた自身のものです。Airlock はただ、一つの決定をするよう求めるだけです。

━━━━━━━━━━━━━━━━━━━━━━━━

言語

20の言語に対応：英語、簡体字中国語、ヒンディー語、スペイン語、フランス語、アラビア語、ベンガル語、ブラジルポルトガル語、ロシア語、ウルドゥー語、インドネシア語、ドイツ語、日本語、スワヒリ語、マラーティー語、テルグ語、トルコ語、タミル語、ベトナム語、韓国語。アラビア語とウルドゥー語は右から左のレイアウトに対応しています。Airlock はデフォルトでブラウザの言語に従います。ポップアップやオプションページの旗のボタンから別の言語を選ぶと、再読み込みなしで一度にすべての表示が切り替わります。

翻訳は自動的に生成されました。あなたの言語で不自然に聞こえる文があれば、プロジェクトのウェブサイトで一行ずつ修正できます：https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

ショートカット

デフォルトは Ctrl+Shift+E（Mac では Cmd+Shift+E）で、chrome://extensions/shortcuts で変更できます。その組み合わせがあなたのマシンで既に使われている場合、Chrome はそれを割り当てません：Airlock が知らせてくれます（インストール時のオプションページ、アイコンの「！」バッジ）、そして正しい設定画面へ案内します。それまでは、アイコンをクリックするだけで同じことができます。

━━━━━━━━━━━━━━━━━━━━━━━━

オープンソース、MIT ライセンス：https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

インストール時の警告について
Chrome の「強化版セーフ ブラウジング」が有効な場合、「この拡張機能は強化版セーフ ブラウジングで信頼されていません」という表示が出ることがあります。これは開発者アカウントが新しいことに関するものであり、Airlock 自体の問題ではありません。Airlock は Chrome ウェブストアによって審査・承認されています。このメッセージは数か月以内に自然に消えます。安心して「インストールを続行」をクリックしてください。
```

---

## Kiswahili (sw)

**Name** (45 characters max): `Airlock: Nasa na Kuweka Vipaumbele`

**Short description** (132 characters max): `Kizuizi cha hewa kati ya wazo na kitendo. Nasa wazo badala ya kuzama ndani yake. 100% ya ndani, hamna utelemetri.`

**Detailed description:**

```text
Unafanya kazi. Wazo linafika. Unazama ndani yake moja kwa moja. Masaa mawili baadaye unagundua ulipuuza kitu cha dharura zaidi.

Airlock inaweka eneo la kizuizi kati ya wazo na kitendo. Imebuniwa kwanza kwa watu wenye ADHD: wazo linafika, linasikika kuwa la dharura, na kufikia wakati unaporudi kwenye uhalisia, kile ulichokuwa unafanya kimepotea.

━━━━━━━━━━━━━━━━━━━━━━━━

JINSI INAVYOFANYA KAZI

Ctrl+Shift+E (Cmd+Shift+E kwenye Mac) kutoka kichupo chochote. Andika wazo. Enter.

• Kama hamna lengo la sasa, wazo linakuwa lengo lako.
• Kama una lengo tayari, Airlock huuliza swali pekee linalohusika: je hili litangulie?

Majibu matatu yanayowezekana:
→ badili: wazo jipya linakuwa lengo, lile la zamani linahamia kwenye foleni
→ wekea foleni: linasubiri zamu yake, lengo lako la sasa linabaki
→ acha: linapuuzwa, na hilo ni sawa kabisa

Vitufe 1, 2 na 3 hujibu bila kugusa kipanya. Ukifunga dirisha-ibukizi kabla ya kujibu, wazo linahifadhiwa na alama ya "?" kwenye ikoni inakusubiri.

Unapokamilisha lengo, mbofyo mmoja kwenye ✓ hulihifadhi kwenye kumbukumbu, na kipengele cha kwanza kwenye foleni hukichukua nafasi yake kiotomatiki. Umebonyeza kimakosa? Kila ufutaji unaweza kutenduliwa kwa sekunde chache.

Dirisha-ibukizi linaonyesha mawazo kumi ya kwanza kwenye foleni. Baada ya hapo, mbofyo mmoja hufungua mwonekano mpana: Airlock yote, kwa skrini nzima kwenye kichupo, kila wazo mbele yako, likiwa sawa na dirisha-ibukizi.

━━━━━━━━━━━━━━━━━━━━━━━━

MLINZI WA LENGO

Kubadili kutoka lengo ambalo bado halijakamilika ndiko kunakovuruga siku. Hivyo unapochagua "badili", Airlock huuliza kwanza: je lengo lako la sasa limekamilika? Ndiyo: linahifadhiwa kwenye kumbukumbu na wazo jipya linachukua nafasi. Bado: Airlock inapendekeza kuweka wazo jipya kwenye foleni, na inahifadhi chaguo tulivu zaidi la "badili hata hivyo" kwa wakati unapotaka hilo kwa kweli.

Swali hilo huruhusiwa wakati wazo jipya ni dhahiri mada ile ile. Ukaguzi huo hufanyika kwenye kompyuta yako pekee: kwa kutumia mfano wa AI wa ndani uliojengwa kwenye Chrome kama kompyuta yako inauweza (Kiingereza, Kihispania, Kijapani, Kijerumani, Kifaransa), au kwa kulinganisha maneno ya mawazo mawili kama hapana. Hamna kinachotumwa popote. Unaweza kuzima mlinzi au kubadilisha unyeti wake kwenye ukurasa wa Chaguzi.

━━━━━━━━━━━━━━━━━━━━━━━━

UMEKWAMA KWENYE "NIANZIE WAPI?"

Gawa lengo lako katika hatua ndogo na madhubuti, ya kwanza ikiwa inawezekana kwa chini ya dakika kumi. Hatua inayofuata basi huonekana chini ya lengo lako, kwenye dirisha-ibukizi, kwenye kidadisi cha ikoni na kwenye kadi ya kikumbusho. Hauhitaji AI; kiungo cha hiari cha Claude Code cha ndani kinaweza kuandaa hatua kwa niaba yako, kwa lugha ya kiolesura chako.

━━━━━━━━━━━━━━━━━━━━━━━━

KWA NINI HII NI TOFAUTI

Msuguano ndio unaua vyombo vya tija. Kama kunasa wazo kunamaanisha kufungua programu, kuchagua mradi na kujaza sehemu tatu, hutafanya hivyo. Utazama kwenye wazo badala yake.

Airlock inaishi ndani ya Chrome, hufunguka kutoka kibodi, na huhitaji kitu kimoja tu: maandishi ya wazo. Hamna mradi wa kuchagua, hamna tarehe ya mwisho, hamna kipaumbele cha kuweka, hamna akaunti ya kufungua.

Hii si kidhibiti cha majukumu. Ni kizuizi cha hewa.

━━━━━━━━━━━━━━━━━━━━━━━━

DATA YAKO INABAKI PENYE ULIPO

• Uhifadhi 100% wa ndani kupitia chrome.storage.local
• Hamna seva, hamna akaunti, hamna usawazishaji
• Hamna utelemetri, hamna uchambuzi, hamna ufuatiliaji, hata "usiotambulika"
• Ruhusa ndogo wakati wa kusakinisha; ufikiaji wa tovuti nyingine huombwa tu ukiwasha kikumbusho kila mahali
• Isipokuwa moja, na tu kama umeiwasha wewe mwenyewe: "Tengeneza na Claude" hutuma maandishi ya wazo moja kwa Claude Code, iliyosakinishwa kwenye kompyuta yako chini ya akaunti yako mwenyewe. Si foleni kamwe, si historia kamwe.

Ukurasa wa Chaguzi hukuruhusu kuhamisha nje data yako kama JSON wakati wowote, na kuihamisha ndani tena. Nakala rudufu inabaki chini ya udhibiti wako.

━━━━━━━━━━━━━━━━━━━━━━━━

KIKUMBUSHO TULIVU: KWENYE CLAUDE.AI, AU KILA MAHALI

Ukitoweka machoni, unapotea akilini. Kadi ya busara, inayoweza kuvutwa, hukukumbusha lengo lako la sasa na hatua yake inayofuata. Kwenye claude.ai huonekana kwa kawaida unapofungua mazungumzo mapya, hasa wakati ule ambapo kubadilisha mazingira hutokea. Washa "kikumbusho kwenye tovuti zote" kwenye ukurasa wa Chaguzi na itakufuata hadi barua pepe, mitandao ya kijamii, tovuti za video: popote ambapo umakini hupotea kwa kweli.

Inaweza kufungwa kwa mbofyo mmoja. Maudhui ya ukurasa hayasomwi kamwe.

━━━━━━━━━━━━━━━━━━━━━━━━

AMBAYO AIRLOCK HAIFANYI

• Hamna arifa zinazokukatiza
• Hamna mchezo wa alama, hamna mfululizo, hamna pointi
• Hamna ufuatiliaji wa muda
• Hamna ripoti za tija
• Hamna AI inayopanga upya vipaumbele vyako kwa niaba yako

Maamuzi yanabaki yako. Airlock inakulazimisha kufanya moja tu.

━━━━━━━━━━━━━━━━━━━━━━━━

LUGHA

Lugha 20: Kiingereza, Kichina Kilichorahisishwa, Kihindi, Kihispania, Kifaransa, Kiarabu, Kibengali, Kireno cha Brazili, Kirusi, Kiurdu, Kiindonesia, Kijerumani, Kijapani, Kiswahili, Kimarathi, Kitelugu, Kituruki, Kitamil, Kivietinamu na Kikorea, likiwa na mpangilio wa kulia kwenda kushoto kwa Kiarabu na Kiurdu. Airlock hufuata lugha ya kivinjari chako kwa kawaida; chagua lugha nyingine kutoka kitufe cha bendera kwenye dirisha-ibukizi au kwenye ukurasa wa Chaguzi, na itabadilika kila mahali papo hapo, bila kupakia upya.

Tafsiri zilitengenezwa kiotomatiki. Kama sentensi inasikika vibaya katika lugha yako, unaweza kuirekebisha mstari kwa mstari kwenye tovuti ya mradi: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

MKATO

Ctrl+Shift+E kwa kawaida (Cmd+Shift+E kwenye Mac), unaobadilika kwenye chrome://extensions/shortcuts. Kama mchanganyiko huo tayari umechukuliwa kwenye kompyuta yako, Chrome haitauunganisha: Airlock itakueleza hivyo (ukurasa wa Chaguzi wakati wa kusakinisha, alama ya "!" kwenye ikoni) na kukuongoza kwenye mpangilio sahihi. Wakati huo huo, mbofyo mmoja kwenye ikoni hufanya kitu kile kile.

━━━━━━━━━━━━━━━━━━━━━━━━

Chanzo huria, leseni ya MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Kuhusu onyo la usakinishaji
Kama kipengele cha Enhanced Safe Browsing cha Chrome kimewashwa, unaweza kuona ujumbe "This extension is not trusted by Enhanced Safe Browsing". Hii inahusiana na akaunti ya mtengenezaji ikiwa mpya, si Airlock yenyewe, ambayo imekaguliwa na kuidhinishwa na Chrome Web Store. Ujumbe huo utatoweka wenyewe baada ya miezi michache. Unaweza kubonyeza "Continue to install" bila wasiwasi.
```

---

## मराठी (mr)

**Name** (45 characters max): `Airlock: कल्पना टिपा, प्राधान्य ठरवा`

**Short description** (132 characters max): `कल्पना आणि कृतीच्या मध्ये Airlock. उडी मारण्याआधी कल्पना टिपून घे. 100% लोकल, शून्य टेलिमेट्री.`

**Detailed description:**

```text
तू काम करत आहेस. एक कल्पना येते. तू लगेच तिच्यात उडी मारतोस. दोन तासांनी लक्षात येते की तू त्यापेक्षा जास्त महत्त्वाचं काहीतरी सोडून दिलं.

Airlock कल्पना आणि कृती यांच्यामध्ये एक बफर झोन ठेवतो. तो आधी ADHD असलेल्या लोकांसाठी बनवला आहे: एक कल्पना येते, ती महत्त्वाची वाटते, आणि तू परत भानावर येईपर्यंत, जे करत होतास ते गायब झालेलं असतं.

━━━━━━━━━━━━━━━━━━━━━━━━

हे कसं काम करतं

कोणत्याही टॅबमधून Ctrl+Shift+E (Mac वर Cmd+Shift+E) दाब. कल्पना टाइप कर. Enter दाब.

• सध्या कोणताही फोकस नसेल, तर ती कल्पना तुझा फोकस बनते.
• आधीच एक फोकस असेल, तर Airlock फक्त एकच खरा प्रश्न विचारतो: ही आधी घ्यायची का?

तीन शक्य उत्तरं:
→ स्विच: नवी कल्पना फोकस बनते, जुनी रांगेत जाते
→ रांग: ती तिची वेळ येण्याची वाट बघते, तुझा सध्याचा फोकस तसाच राहतो
→ सोडून दे: ती सोडून दिली जाते, आणि ते अगदी ठीक आहे

1, 2 आणि 3 या की माउसला न शिवता उत्तर देतात. उत्तर देण्याआधी तू पॉपअप बंद केलं, तर कल्पना साठवली जाते आणि आयकॉनवर एक "?" तुझी वाट बघतो.

तू एक फोकस पूर्ण करतोस तेव्हा, ✓ वर एक क्लिक तो आर्काइव्ह करतो आणि रांगेतला पहिला आयटम आपोआप त्याची जागा घेतो. चुकून क्लिक झालं? प्रत्येक काढलेली गोष्ट काही सेकंदांसाठी पूर्ववत केली जाऊ शकते.

पॉपअप रांगेतल्या पहिल्या दहा कल्पना दाखवतो. त्यापेक्षा जास्त असतील, तर एक क्लिक वाइड व्ह्यू उघडतो: संपूर्ण Airlock, टॅबमध्ये पूर्ण स्क्रीनवर, प्रत्येक कल्पना नजरेसमोर, पॉपअपसोबत सिंकमध्ये.

━━━━━━━━━━━━━━━━━━━━━━━━

फोकस गार्ड

अपूर्ण फोकसवरून बाजूला जाणे हेच दिवस विस्कळीत होण्याचं कारण असतं. त्यामुळे तू "स्विच" निवडतोस तेव्हा, Airlock आधी विचारतो: तुझा सध्याचा फोकस पूर्ण झाला आहे का? होय: तो आर्काइव्ह होतो आणि नवी कल्पना त्याची जागा घेते. अजून नाही: Airlock नवी कल्पना रांगेत ठेवण्याचा सल्ला देतो, आणि तुला खरंच गरज असेल तेव्हासाठी एक शांत "तरीही स्विच कर" पर्याय ठेवतो.

नवी कल्पना स्पष्टपणे त्याच विषयाची असेल, तेव्हा हा प्रश्न टाळला जातो. ही तपासणी फक्त तुझ्या मशीनवर चालते: तुझा संगणक सपोर्ट करत असेल तर (इंग्रजी, स्पॅनिश, जपानी, जर्मन, फ्रेंच) Chrome च्या बिल्ट-इन लोकल AI मॉडेलने, नाहीतर दोन कल्पनांच्या शब्दांची तुलना करून. काहीही कुठेही पाठवलं जात नाही. तू गार्ड Options पानावरून बंद करू शकतोस किंवा त्याची संवेदनशीलता बदलू शकतोस.

━━━━━━━━━━━━━━━━━━━━━━━━

"कुठून सुरुवात करू?" मध्ये अडकला आहेस

तुझा फोकस छोट्या, ठोस पायऱ्यांमध्ये विभागा, पहिली पायरी 10 मिनिटांपेक्षा कमी वेळात होणारी असू दे. पुढची पायरी मग तुझ्या फोकसखाली दिसते: पॉपअपमध्ये, आयकॉनच्या टूलटिपमध्ये आणि रिमाइंडर कार्डमध्ये. यासाठी कोणत्याही AI ची गरज नाही; एक ऐच्छिक लोकल Claude Code ब्रिज तुझ्या इंटरफेसच्या भाषेत पायऱ्या तयार करून देऊ शकतो.

━━━━━━━━━━━━━━━━━━━━━━━━

हे वेगळं का आहे

फ्रिक्शनच प्रोडक्टिव्हिटी टूल्स निकामी करतो. एखादी कल्पना टिपण्यासाठी अ‍ॅप उघडावं लागलं, प्रोजेक्ट निवडावा लागला आणि तीन फील्ड भरावी लागली, तर तू ते करणारच नाहीस. त्याऐवजी तू त्या कल्पनेत उडी मारशील.

Airlock Chrome मध्येच राहतो, कीबोर्डवरून उघडतो, आणि फक्त एकच गोष्ट मागतो: कल्पनेचा मजकूर. कोणताही प्रोजेक्ट निवडायचा नाही, ड्यू डेट नाही, प्राधान्य ठरवायचं नाही, खातं उघडायचं नाही.

हा टास्क मॅनेजर नाही. हा एक एअरलॉक आहे.

━━━━━━━━━━━━━━━━━━━━━━━━

तुझा डेटा तिथेच राहतो

• chrome.storage.local द्वारे 100% लोकल स्टोरेज
• सर्व्हर नाही, खातं नाही, सिंक नाही
• टेलिमेट्री नाही, अ‍ॅनालिटिक्स नाही, ट्रॅकिंग नाही, "निनावी" देखील नाही
• इन्स्टॉलवर किमान परवानग्या; इतर साइट्सवरील अ‍ॅक्सेस फक्त तू रिमाइंडर सगळीकडे चालू करशील तेव्हाच मागितला जातो
• एक अपवाद, आणि फक्त तू स्वतः तो चालू केला तरच: "Generate with Claude" फक्त एका कल्पनेचा मजकूर Claude Code ला पाठवतो, जो तुझ्या मशीनवर तुझ्याच खात्याने इन्स्टॉल केलेला असतो. कधीही रांग नाही, कधीही इतिहास नाही.

Options पान तुला केव्हाही तुझा डेटा JSON म्हणून एक्सपोर्ट करू देतो, आणि तो परत इम्पोर्ट करू देतो. बॅकअप तुझ्याच नियंत्रणात राहतो.

━━━━━━━━━━━━━━━━━━━━━━━━

पॅसिव्ह रिमाइंडर: CLAUDE.AI वर, किंवा सगळीकडे

नजरेआड, मनाआडही. एक साधं, ओढून हलवता येणारं कार्ड तुला तुझा सध्याचा फोकस आणि त्याची पुढची पायरी आठवून देतं. claude.ai वर ते आधीपासूनच दिसतं जेव्हा तू नवं संभाषण उघडतोस, नेमकं त्याच क्षणी जेव्हा context-switching होतं. Options पानावर "reminder on every site" चालू कर आणि ते ईमेल, सोशल मीडिया, व्हिडिओ साइट्सपर्यंत तुझ्यासोबत येतं: जिथे लक्ष खरंच विचलित होतं तिथे.

एका क्लिकने बंद होतं. पानाचा मजकूर कधीही वाचला जात नाही.

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock काय करत नाही

• तुला अडवणारी कोणतीही नोटिफिकेशन नाही
• गेमिफिकेशन नाही, स्ट्रीक नाही, स्कोअर नाही
• टाइम ट्रॅकिंग नाही
• प्रोडक्टिव्हिटी रिपोर्ट्स नाहीत
• तुझी प्राधान्यं स्वतः बदलणारा कोणताही AI नाही

निर्णय नेहमी तुझेच राहतात. Airlock फक्त एक निर्णय घ्यायला भाग पाडतो.

━━━━━━━━━━━━━━━━━━━━━━━━

भाषा

20 भाषा: इंग्रजी, सरलीकृत चिनी, हिंदी, स्पॅनिश, फ्रेंच, अरबी, बांगला, ब्राझिलियन पोर्तुगीज, रशियन, उर्दू, इंडोनेशियन, जर्मन, जपानी, स्वाहिली, मराठी, तेलुगू, तुर्की, तमिळ, व्हिएतनामी आणि कोरियन, अरबी आणि उर्दूसाठी राइट-टू-लेफ्ट मांडणीसह. Airlock आधीपासून तुझ्या ब्राउझरची भाषा फॉलो करतो; पॉपअपमधल्या फ्लॅग बटणावरून किंवा Options पानावरून दुसरी भाषा निवड, आणि ती रीलोड न करता लगेच सगळीकडे बदलते.

भाषांतरे आपोआप तयार केली गेली आहेत. तुझ्या भाषेत कोणतं वाक्य चुकीचं वाटलं, तर तू ते प्रोजेक्टच्या वेबसाइटवर एक-एक ओळ दुरुस्त करू शकतोस: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

शॉर्टकट

आधीपासून Ctrl+Shift+E (Mac वर Cmd+Shift+E), जो chrome://extensions/shortcuts वर बदलता येतो. हे कॉम्बिनेशन तुझ्या मशीनवर आधीच कशासाठी तरी घेतलेलं असेल, तर Chrome ते बाइंड करत नाही: Airlock तुला सांगतो (इन्स्टॉलच्या वेळी Options पान, आयकॉनवर "!" बॅज) आणि योग्य सेटिंगपर्यंत घेऊन जातो. तोपर्यंत, आयकॉनवर एक क्लिक तेच काम करतो.

━━━━━━━━━━━━━━━━━━━━━━━━

ओपन सोर्स, MIT परवाना: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

इन्स्टॉल इशाऱ्याबद्दल
Chrome चा Enhanced Safe Browsing चालू असेल, तर तुला "This extension is not trusted by Enhanced Safe Browsing" असं दिसू शकतं. हे डेव्हलपर खातं नवीन असल्याबद्दल आहे, Airlock बद्दल नाही, जो Chrome Web Store ने तपासून मान्यता दिलेला आहे. हा मेसेज काही महिन्यांत आपोआप जाईल. तू बिनधास्त "Continue to install" वर क्लिक करू शकतोस.
```

---

## తెలుగు (te)

**Name** (45 characters max): `Airlock: పట్టుకో మరియు ప్రాధాన్యత ఇవ్వు`

**Short description** (132 characters max): `ప్రేరణకు మరియు చర్యకు మధ్య ఒక గాలి తాళం. ఆలోచనలో మునిగే బదులు దాన్ని పట్టుకో. 100% లోకల్, జీరో టెలిమెట్రీ.`

**Detailed description:**

```text
నువ్వు పని చేస్తున్నావు. ఒక ఆలోచన వస్తుంది. నువ్వు నేరుగా అందులో మునిగిపోతావు. రెండు గంటల తర్వాత, నువ్వు మరింత అర్జెంట్ అయిన దాన్ని వదిలేశావని గ్రహిస్తావు.

Airlock ప్రేరణకు మరియు చర్యకు మధ్య ఒక బఫర్ జోన్‌ను ఉంచుతుంది. ఇది ముందుగా ADHD ఉన్నవారి కోసం రూపొందించబడింది: ఒక ఆలోచన వస్తుంది, అది అర్జెంట్‌గా అనిపిస్తుంది, నువ్వు దాని నుంచి తేరుకునేసరికి, నువ్వు చేస్తున్నది మాయమైపోతుంది.

━━━━━━━━━━━━━━━━━━━━━━━━

ఇది ఎలా పనిచేస్తుంది

ఏ టాబ్ నుంచైనా Ctrl+Shift+E (Macలో Cmd+Shift+E). ప్రేరణను టైప్ చేయి. Enter.

• నీకు ఇప్పుడు ఫోకస్ లేకపోతే, ప్రేరణ నీ ఫోకస్‌గా మారుతుంది.
• నీకు ఇప్పటికే ఫోకస్ ఉంటే, Airlock ముఖ్యమైన ఒక్క ప్రశ్న అడుగుతుంది: ఇది ముందు వెళ్తుందా?

మూడు సాధ్యమైన సమాధానాలు:
→ మారు: కొత్త ప్రేరణ ఫోకస్‌గా మారుతుంది, పాతది వరుసకు వెళుతుంది
→ వరుస: అది తన వంతు కోసం వేచి ఉంటుంది, నీ ఇప్పటి ఫోకస్ అలాగే ఉంటుంది
→ వదులు: పక్కన పెట్టబడుతుంది, అది పూర్తిగా బాగానే ఉంది

1, 2 మరియు 3 కీలు మౌస్ తాకకుండా సమాధానం ఇస్తాయి. సమాధానం చెప్పకముందే పాప్అప్‌ను మూసేస్తే, ప్రేరణ ఉంచబడుతుంది మరియు ఐకాన్‌పై ఒక "?" నీ కోసం వేచి ఉంటుంది.

నువ్వు ఒక ఫోకస్‌ను ముగించినప్పుడు, ✓పై ఒక క్లిక్ దాన్ని ఆర్కైవ్ చేస్తుంది, వరుసలో మొదటిది తనంతట తానే దాని స్థానం తీసుకుంటుంది. పొరపాటున క్లిక్ చేశావా? ప్రతి తొలగింపును కొన్ని సెకన్ల పాటు రద్దు చేయవచ్చు.

పాప్అప్ వరుసలోని మొదటి పది ఆలోచనలను చూపిస్తుంది. దాటితే, ఒక క్లిక్ వైడ్ వీక్షణను తెరుస్తుంది: Airlock మొత్తం, ఒక టాబ్‌లో పూర్తి తెరపై, ప్రతి ఆలోచన కనిపిస్తూ, పాప్అప్‌తో సింక్‌లో ఉంటుంది.

━━━━━━━━━━━━━━━━━━━━━━━━

ఫోకస్ గార్డ్

పూర్తవని ఫోకస్ నుంచి మారడం రోజు చెదిరిపోవడానికి కారణం. అందుకే నువ్వు "మారు" ఎంచుకున్నప్పుడు, Airlock ముందు అడుగుతుంది: నీ ఇప్పటి ఫోకస్ పూర్తయిందా? అవును: అది ఆర్కైవ్ అయి కొత్త ఆలోచన దాని స్థానం తీసుకుంటుంది. ఇంకా లేదు: Airlock కొత్త ఆలోచనను వరుసలో పార్క్ చేయమని సూచిస్తుంది, నువ్వు నిజంగా అలా అనుకున్నప్పుడు ఒక నిశ్శబ్దమైన "అయినా మారు" ఆప్షన్‌ను కూడా ఉంచుతుంది.

కొత్త ఆలోచన స్పష్టంగా అదే విషయమైతే ప్రశ్న దాటవేయబడుతుంది. ఆ చెక్ నీ కంప్యూటర్‌లోనే జరుగుతుంది: నీ కంప్యూటర్ సపోర్ట్ చేస్తే Chrome యొక్క బిల్ట్-ఇన్ లోకల్ AI మోడల్‌తో (ఇంగ్లీష్, స్పానిష్, జపనీస్, జర్మన్, ఫ్రెంచ్), లేకపోతే రెండు ఆలోచనల పదాలను పోల్చడం ద్వారా. ఏమీ ఎక్కడికీ పంపబడదు. ఆప్షన్స్ పేజీలో గార్డ్‌ను ఆఫ్ చేయవచ్చు లేదా దాని సెన్సిటివిటీని మార్చవచ్చు.

━━━━━━━━━━━━━━━━━━━━━━━━

"ఎక్కడ మొదలుపెట్టాలి?" అనే సమస్యలో ఉన్నావా

నీ ఫోకస్‌ను చిన్న, నిర్దిష్ట అడుగులుగా విభజించు, మొదటిది 10 నిమిషాల్లో చేయగలిగేది. తర్వాత తదుపరి అడుగు నీ ఫోకస్ కింద, పాప్అప్‌లో, ఐకాన్ టూల్‌టిప్‌లో మరియు గుర్తుచేత కార్డ్‌లో కనిపిస్తుంది. AI అవసరం లేదు; ఒక ఆప్షనల్ లోకల్ Claude Code బ్రిడ్జ్ నీ ఇంటర్‌ఫేస్ భాషలో అడుగులను తయారు చేయగలదు.

━━━━━━━━━━━━━━━━━━━━━━━━

ఇది ఎందుకు వేరుగా ఉంటుంది

ప్రొడక్టివిటీ టూల్స్‌ను చంపేది ఫ్రిక్షన్. ఒక ఆలోచనను పట్టుకోవడం అంటే ఒక యాప్ తెరవడం, ఒక ప్రాజెక్ట్ ఎంచుకోవడం మరియు మూడు ఫీల్డ్‌లు నింపడం అయితే, నువ్వు అది చేయవు. దానికి బదులు నువ్వు ప్రేరణలో మునిగిపోతావు.

Airlock Chromeలో ఉంటుంది, కీబోర్డ్ నుంచి తెరుచుకుంటుంది, ఒక్క విషయం మాత్రమే అడుగుతుంది: ప్రేరణ యొక్క వచనం. ఎంచుకోవడానికి ప్రాజెక్ట్ లేదు, డ్యూ డేట్ లేదు, కేటాయించడానికి ప్రాధాన్యత లేదు, సృష్టించడానికి ఖాతా లేదు.

ఇది టాస్క్ మేనేజర్ కాదు. ఇది ఒక గాలి తాళం.

━━━━━━━━━━━━━━━━━━━━━━━━

నీ డేటా అక్కడే ఉంటుంది

• chrome.storage.local ద్వారా 100% లోకల్ స్టోరేజ్
• సర్వర్ లేదు, ఖాతా లేదు, సింక్ లేదు
• టెలిమెట్రీ లేదు, అనలిటిక్స్ లేదు, ట్రాకింగ్ లేదు, "అనామకం" చేసినది కూడా లేదు
• ఇన్‌స్టాల్ సమయంలో మినిమల్ పర్మిషన్స్; నువ్వు అన్ని సైట్‌లలో గుర్తుచేతను ఆన్ చేస్తేనే ఇతర సైట్‌లకు యాక్సెస్ అడుగుతుంది
• ఒక్క మినహాయింపు, అది కూడా నువ్వు స్వయంగా ఆన్ చేస్తేనే: "Claudeతో జనరేట్ చేయి" ఒక్క ప్రేరణ యొక్క వచనాన్ని, నీ స్వంత ఖాతా కింద నీ కంప్యూటర్‌లో ఇన్‌స్టాల్ అయిన Claude Codeకు పంపుతుంది. వరుస కానీ చరిత్ర కానీ ఎప్పుడూ కాదు.

ఒక ఆప్షన్స్ పేజీ నీ డేటాను ఎప్పుడైనా JSONగా ఎక్స్‌పోర్ట్ చేయడానికి, దాన్ని తిరిగి ఇంపోర్ట్ చేయడానికి అనుమతిస్తుంది. బ్యాకప్ నీ కంట్రోల్‌లోనే ఉంటుంది.

━━━━━━━━━━━━━━━━━━━━━━━━

పాసివ్ గుర్తుచేత: CLAUDE.AIలో, లేదా ప్రతిచోటా

కనిపించకపోతే, మర్చిపోతావు. ఒక సున్నితమైన, లాగగలిగే కార్డ్ నీ ఇప్పటి ఫోకస్‌ను మరియు దాని తదుపరి అడుగును గుర్తుచేస్తుంది. claude.aiలో ఇది డిఫాల్ట్‌గా నువ్వు కొత్త సంభాషణను తెరిచినప్పుడు కనిపిస్తుంది, సరిగ్గా కాంటెక్స్ట్-స్విచింగ్ జరిగే క్షణంలో. ఆప్షన్స్ పేజీలో "అన్ని సైట్‌లలో గుర్తుచేత"ను ఆన్ చేస్తే అది ఇమెయిల్, సోషల్ మీడియా, వీడియో సైట్‌లకు కూడా నిన్ను అనుసరిస్తుంది: దృష్టి నిజంగా తప్పించుకునే ప్రతిచోటా.

ఒక క్లిక్‌తో మూసివేయగలిగేది. పేజీ కంటెంట్ ఎప్పుడూ చదవబడదు.

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock చేయనివి

• నిన్ను డిస్టర్బ్ చేసే నోటిఫికేషన్‌లు లేవు
• గేమిఫికేషన్ లేదు, స్ట్రీక్‌లు లేవు, స్కోర్ లేదు
• టైమ్ ట్రాకింగ్ లేదు
• ప్రొడక్టివిటీ రిపోర్ట్‌లు లేవు
• నీ ప్రాధాన్యతలను తనంతట తానే మార్చే AI లేదు

నిర్ణయాలు నీవే తీసుకుంటావు. Airlock నిన్ను ఒకటి తీసుకోమని మాత్రమే బలవంతం చేస్తుంది.

━━━━━━━━━━━━━━━━━━━━━━━━

భాష

20 భాషలు: ఇంగ్లీష్, సింప్లిఫైడ్ చైనీస్, హిందీ, స్పానిష్, ఫ్రెంచ్, అరబిక్, బెంగాలీ, బ్రెజిలియన్ పోర్చుగీస్, రష్యన్, ఉర్దూ, ఇండోనేషియన్, జర్మన్, జపనీస్, స్వాహిలి, మరాఠీ, తెలుగు, టర్కిష్, తమిళం, వియత్నామీస్ మరియు కొరియన్, అరబిక్ మరియు ఉర్దూ కోసం కుడి-నుండి-ఎడమ లేఅవుట్‌తో. Airlock డిఫాల్ట్‌గా నీ బ్రౌజర్ భాషను అనుసరిస్తుంది; పాప్అప్‌లో లేదా ఆప్షన్స్ పేజీలోని ఫ్లాగ్ బటన్ నుంచి మరొకదాన్ని ఎంచుకో, అది రీలోడ్ లేకుండా అన్నిచోట్లా ఒకేసారి మారుతుంది.

అనువాదాలు ఆటోమాటిక్‌గా జనరేట్ అయ్యాయి. నీ భాషలో ఏదైనా వాక్యం తప్పుగా ధ్వనిస్తే, ప్రాజెక్ట్ వెబ్‌సైట్‌లో దాన్ని లైన్ బై లైన్ సరిచేయవచ్చు: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

షార్ట్‌కట్

డిఫాల్ట్‌గా Ctrl+Shift+E (Macలో Cmd+Shift+E), chrome://extensions/shortcuts వద్ద మార్చగలిగేది. ఆ కాంబినేషన్ నీ కంప్యూటర్‌లో ఇప్పటికే తీసుకోబడితే, Chrome దాన్ని బైండ్ చేయదు: Airlock నీకు చెబుతుంది (ఇన్‌స్టాల్ సమయంలో ఆప్షన్స్ పేజీ, ఐకాన్‌పై "!" బ్యాడ్జ్) మరియు సరైన సెట్టింగ్‌కు నిన్ను తీసుకెళుతుంది. అంతవరకు, ఐకాన్‌పై ఒక క్లిక్ అదే చేస్తుంది.

━━━━━━━━━━━━━━━━━━━━━━━━

ఓపెన్ సోర్స్, MIT లైసెన్స్: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

ఇన్‌స్టాల్ హెచ్చరిక గురించి
Chrome యొక్క Enhanced Safe Browsing ఆన్‌లో ఉంటే, నువ్వు "This extension is not trusted by Enhanced Safe Browsing" అని చూడవచ్చు. ఇది Airlock గురించి కాదు, డెవలపర్ ఖాతా కొత్తది కావడం గురించి; Airlock Chrome Web Store ద్వారా రివ్యూ చేయబడి ఆమోదించబడింది. ఈ మెసేజ్ కొన్ని నెలల్లో తనంతట తానే పోతుంది. "Continue to install"పై క్లిక్ చేయడం సురక్షితం.
```

---

## Türkçe (tr)

**Name** (45 characters max): `Airlock: Yakala ve Önceliklendir`

**Short description** (132 characters max): `Dürtü ile eylem arasında bir hava kilidi. Fikre dalmak yerine onu yakala. %100 yerel, sıfır telemetri.`

**Detailed description:**

```text
Çalışıyorsun. Bir fikir geliyor. Hemen ona dalıyorsun. İki saat sonra daha acil bir şeyi bıraktığını fark ediyorsun.

Airlock, dürtü ile eylem arasına bir tampon bölge koyar. Öncelikle DEHB'si olan insanlar için tasarlandı: bir fikir gelir, acil hissettirir, ve yüzeye çıktığında yaptığın şey çoktan gitmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━

NASIL ÇALIŞIR

Herhangi bir sekmeden Ctrl+Shift+E (Mac'te Cmd+Shift+E). Dürtüyü yaz. Enter.

• Şu anda bir odağın yoksa, dürtü odağın olur.
• Zaten bir odağın varsa, Airlock önemli olan tek soruyu sorar: bu öne mi geçsin?

Üç olası cevap:
→ geç: yeni dürtü odak olur, eski odak sıraya taşınır
→ sıraya al: sırasını bekler, şu anki odağın korunur
→ bırak: vazgeçilir, ve bu tamamen normaldir

1, 2 ve 3 tuşları fareye dokunmadan cevap verir. Cevaplamadan popup'ı kapatırsan, dürtü saklanır ve ikonda bir "?" seni bekler.

Bir odağı bitirdiğinde, ✓ üzerine bir tıklama onu arşivler ve sıradaki ilk öğe otomatik olarak onun yerini alır. Yanlış tıkladın mı? Her silme işlemi birkaç saniye için geri alınabilir.

Popup, sıradaki ilk on fikri gösterir. Bunun ötesinde, bir tıklama geniş görünümü açar: Airlock'un tamamı, bir sekmede tam ekran, her fikir gözünün önünde, popup'la eşzamanlı.

━━━━━━━━━━━━━━━━━━━━━━━━

ODAK KORUMASI

Bitmemiş bir odaktan uzaklaşmak, günün dağılmasına sebep olur. Bu yüzden "geç"i seçtiğinde Airlock önce sorar: şu anki odağın bitti mi? Evet: arşivlenir ve yeni fikir onun yerini alır. Henüz değil: Airlock yeni fikri sıraya park etmeyi önerir ve gerçekten öyle istediğinde kullanabileceğin daha sessiz bir "yine de geç" seçeneğini korur.

Yeni fikir açıkça aynı konu olduğunda bu soru atlanır. Bu kontrol sadece kendi makinende çalışır: bilgisayarın destekliyorsa Chrome'un yerleşik yerel AI modeliyle (İngilizce, İspanyolca, Japonca, Almanca, Fransızca), değilse iki fikrin kelimelerini karşılaştırarak. Hiçbir şey hiçbir yere gönderilmez. Koruma'yı Seçenekler sayfasından kapatabilir veya hassasiyetini değiştirebilirsin.

━━━━━━━━━━━━━━━━━━━━━━━━

"NEREDEN BAŞLAMALI?" SORUSUNDA SIKIŞTIN MI

Odağını küçük, somut adımlara böl; ilki on dakikadan kısa sürede yapılabilsin. Sıradaki adım artık odağının altında, popup'ta, ikon ipucunda ve hatırlatıcı kartta görünür. Yapay zekâ gerekmez; isteğe bağlı yerel Claude Code bağlantısı adımları senin için, arayüz dilinde taslak hâline getirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━

NEDEN FARKLI

Sürtünme, verimlilik araçlarını öldüren şeydir. Bir düşünceyi yakalamak bir uygulama açmak, bir proje seçmek ve üç alanı doldurmak demekse, bunu yapmazsın. Bunun yerine dürtüye dalarsın.

Airlock Chrome içinde yaşar, klavyeden açılır ve sadece bir şey ister: dürtünün metni. Seçilecek proje yok, bitiş tarihi yok, atanacak öncelik yok, oluşturulacak hesap yok.

Bu bir görev yöneticisi değil. Bir hava kilidi.

━━━━━━━━━━━━━━━━━━━━━━━━

VERİLERİN YERİNDE KALIR

• chrome.storage.local üzerinden %100 yerel depolama
• Sunucu yok, hesap yok, senkronizasyon yok
• Telemetri yok, analiz yok, takip yok, "anonimleştirilmiş" olsa bile
• Kurulumda minimal izinler; diğer sitelere erişim sadece her yerde hatırlatıcıyı açtığında istenir
• Bir istisna, sadece kendin açarsan: "Claude ile oluştur", tek bir dürtünün metnini, kendi hesabın altında makinene kurulu olan Claude Code'a gönderir. Sıra asla, geçmiş asla.

Bir Seçenekler sayfası verilerini her an JSON olarak dışa aktarmanı ve geri içe aktarmanı sağlar. Yedekleme senin kontrolünde kalır.

━━━━━━━━━━━━━━━━━━━━━━━━

PASİF HATIRLATICI: CLAUDE.AI'DE, YA DA HER YERDE

Gözden ırak, akıldan ırak. Gizli, sürüklenebilir bir kart sana şu anki odağını ve sıradaki adımını hatırlatır. claude.ai'de, yeni bir konuşma açtığında, bağlam değişiminin tam olarak gerçekleştiği anda varsayılan olarak görünür. Seçenekler sayfasında "her sitede hatırlatıcı"yı aç, seni e-postaya, sosyal medyaya, video sitelerine takip etsin: dikkatinin gerçekten kaçtığı her yere.

Bir tıkla kapatılabilir. Sayfa içeriği asla okunmaz.

━━━━━━━━━━━━━━━━━━━━━━━━

AIRLOCK'UN YAPMADIKLARI

• Seni bölen bildirimler yok
• Oyunlaştırma yok, seri yok, puan yok
• Zaman takibi yok
• Verimlilik raporları yok
• Önceliklerini senin yerine karıştıran bir yapay zekâ yok

Kararlar senin kalır. Airlock sadece birini vermeni zorunlu kılar.

━━━━━━━━━━━━━━━━━━━━━━━━

DİL

20 dil: İngilizce, Basitleştirilmiş Çince, Hintçe, İspanyolca, Fransızca, Arapça, Bengalce, Brezilya Portekizcesi, Rusça, Urduca, Endonezce, Almanca, Japonca, Swahili, Marathi, Telugu, Türkçe, Tamil, Vietnamca ve Korece; Arapça ve Urduca için sağdan sola düzen. Airlock varsayılan olarak tarayıcı dilini takip eder; popup'taki bayrak düğmesinden veya Seçenekler sayfasından başka bir dil seç, her yerde anında, yeniden yükleme olmadan değişir.

Çeviriler otomatik olarak üretildi. Dilinde bir cümle yanlış geliyorsa, proje web sitesinde satır satır düzeltebilirsin: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

KISAYOL

Varsayılan olarak Ctrl+Shift+E (Mac'te Cmd+Shift+E), chrome://extensions/shortcuts adresinden değiştirilebilir. Bu kombinasyon makinende zaten alınmışsa Chrome onu bağlamaz: Airlock sana bunu söyler (kurulumda Seçenekler sayfası, ikonda "!" rozeti) ve seni doğru ayara yönlendirir. Bu arada, ikona tek bir tıklama aynı işi yapar.

━━━━━━━━━━━━━━━━━━━━━━━━

Açık kaynak, MIT lisansı: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Kurulum uyarısı hakkında
Chrome'un Gelişmiş Güvenli Tarama özelliği açıksa, "Bu uzantı Gelişmiş Güvenli Tarama tarafından güvenilir bulunmuyor" mesajını görebilirsin. Bu, geliştirici hesabının yeni olmasıyla ilgilidir, Airlock'un kendisiyle değil; Airlock, Chrome Web Mağazası tarafından incelenmiş ve onaylanmıştır. Mesaj birkaç ay içinde kendiliğinden kaybolur. "Yüklemeye devam et"e güvenle tıklayabilirsin.
```

---

## தமிழ் (ta)

**Name** (45 characters max): `Airlock: பிடி மற்றும் முன்னுரிமை`

**Short description** (132 characters max): `தூண்டுதலுக்கும் செயலுக்கும் இடையே ஒரு காற்றுப்பூட்டு. எண்ணத்தில் மூழ்குவதற்குப் பதிலாக அதைப் பிடி. 100% உள்ளூர், பூஜ்ஜிய டெலிமெட்ரி.`

**Detailed description:**

```text
நீ வேலை செய்துகொண்டிருக்கிறாய். ஒரு எண்ணம் வருகிறது. நீ நேராக அதில் மூழ்குகிறாய். இரண்டு மணி நேரம் கழித்து, நீ இன்னும் அவசரமான ஒன்றை விட்டுவிட்டதை உணர்கிறாய்.

Airlock தூண்டுதலுக்கும் செயலுக்கும் இடையே ஒரு இடைவெளி மண்டலத்தை வைக்கிறது. இது முதன்மையாக ADHD உள்ளவர்களுக்காக வடிவமைக்கப்பட்டது: ஒரு எண்ணம் வருகிறது, அது அவசரமாக உணரப்படுகிறது, நீ அதிலிருந்து மீண்டும் மேல்மட்டத்திற்கு வரும் நேரத்தில், நீ செய்துகொண்டிருந்தது மறைந்துவிட்டிருக்கும்.

━━━━━━━━━━━━━━━━━━━━━━━━

இது எப்படி வேலை செய்கிறது

எந்த தாவலிலிருந்தும் Ctrl+Shift+E (Mac-இல் Cmd+Shift+E). தூண்டுதலை தட்டச்சு செய். Enter.

• உனக்கு இப்போதைய கவனம் இல்லை என்றால், தூண்டுதல் உன் கவனமாகிறது.
• உனக்கு ஏற்கனவே ஒரு கவனம் இருந்தால், Airlock ஒரே முக்கியமான கேள்வியைக் கேட்கிறது: இது முதலில் செல்லுமா?

மூன்று சாத்தியமான பதில்கள்:
→ மாறு: புதிய தூண்டுதல் கவனமாகிறது, பழையது வரிசைக்குச் செல்கிறது
→ வரிசை: அது தன் முறைக்காகக் காத்திருக்கிறது, உன் இப்போதைய கவனம் பாதுகாக்கப்படுகிறது
→ விடு: நிராகரிக்கப்படுகிறது, அது முற்றிலும் நல்லதே

1, 2 மற்றும் 3 விசைகள் மவுஸைத் தொடாமல் பதிலளிக்கின்றன. பதிலளிப்பதற்கு முன் பாப்அப்பை மூடினால், தூண்டுதல் வைக்கப்படும், ஐகானில் ஒரு "?" உனக்காகக் காத்திருக்கும்.

நீ ஒரு கவனத்தை முடிக்கும்போது, ✓ மீது ஒரு கிளிக் அதை காப்பகப்படுத்துகிறது, வரிசையில் முதலில் உள்ளது தானாக அதன் இடத்தை எடுக்கும். தவறாக கிளிக் செய்தாயா? ஒவ்வொரு நீக்கமும் சில வினாடிகளுக்கு திரும்பப்பெறப்படலாம்.

பாப்அப் வரிசையிலுள்ள முதல் பத்து எண்ணங்களைக் காட்டுகிறது. அதற்கு மேல், ஒரு கிளிக் விரிவான பார்வையைத் திறக்கிறது: Airlock முழுவதும், ஒரு தாவலில் முழுத்திரையில், ஒவ்வொரு எண்ணமும் கண்ணில் படும்படி, பாப்அப்புடன் ஒத்திசைந்து.

━━━━━━━━━━━━━━━━━━━━━━━━

கவனக் காவலர்

முடியாத ஒரு கவனத்திலிருந்து மாறுவதுதான் நாள் சிதறுவதற்குக் காரணம். எனவே நீ "மாறு" என்பதைத் தேர்ந்தெடுக்கும்போது, Airlock முதலில் கேட்கிறது: உன் இப்போதைய கவனம் முடிந்ததா? ஆம்: அது காப்பகப்படுத்தப்பட்டு புதிய எண்ணம் பொறுப்பேற்கும். இன்னும் இல்லை: Airlock புதிய எண்ணத்தை வரிசையில் நிறுத்தி வைக்க பரிந்துரைக்கிறது, நீ உண்மையில் அதை விரும்பும்போது ஒரு அமைதியான "எப்படியும் மாறு" விருப்பத்தையும் வைத்திருக்கிறது.

புதிய எண்ணம் தெளிவாக அதே விஷயமாக இருந்தால் கேள்வி தவிர்க்கப்படும். அந்த சோதனை உன் கணினியில் மட்டுமே நடக்கும்: உன் கணினி ஆதரித்தால் Chrome-இன் உள்ளமைக்கப்பட்ட உள்ளூர் AI மாடலுடன் (ஆங்கிலம், ஸ்பானிஷ், ஜப்பானியம், ஜெர்மன், பிரெஞ்சு), இல்லையெனில் இரு எண்ணங்களின் சொற்களை ஒப்பிட்டு. எதுவும் எங்கும் அனுப்பப்படாது. காவலரை நிறுத்தவோ அதன் உணர்திறனை மாற்றவோ விருப்பங்கள் பக்கத்தில் செய்யலாம்.

━━━━━━━━━━━━━━━━━━━━━━━━

"எங்கிருந்து தொடங்குவது?" என்பதில் சிக்கியிருக்கிறாயா

உன் கவனத்தை சிறு, உறுதியான படிகளாகப் பிரி, முதலாவது 10 நிமிடங்களுக்குள் செய்யக்கூடியதாக இருக்க வேண்டும். பின்னர் அடுத்த படி உன் கவனத்தின் கீழ், பாப்அப்பில், ஐகான் tooltip-இல் மற்றும் நினைவூட்டல் அட்டையில் தோன்றும். AI தேவையில்லை; ஒரு விருப்பமான உள்ளூர் Claude Code இணைப்பு உன் இடைமுக மொழியில் படிகளை உருவாக்கித் தரலாம்.

━━━━━━━━━━━━━━━━━━━━━━━━

இது எப்படி வித்தியாசமானது

உற்பத்தித்திறன் கருவிகளைக் கொல்வது உராய்வுதான். ஒரு எண்ணத்தைப் பிடிப்பது ஒரு பயன்பாட்டைத் திறப்பது, ஒரு திட்டத்தைத் தேர்ந்து மூன்று புலங்களை நிரப்புவது என்றால், நீ அதைச் செய்ய மாட்டாய். நீ அதற்குப் பதிலாக தூண்டுதலில் மூழ்குவாய்.

Airlock Chrome-இல் வசிக்கிறது, விசைப்பலகையிலிருந்து திறக்கிறது, ஒரே ஒரு விஷயத்தை மட்டும் கேட்கிறது: தூண்டுதலின் உரை. தேர்ந்துகொள்ள திட்டம் இல்லை, கடைசி தேதி இல்லை, ஒதுக்க முன்னுரிமை இல்லை, உருவாக்க கணக்கு இல்லை.

இது ஒரு பணி மேலாளி அல்ல. இது ஒரு காற்றுப்பூட்டு.

━━━━━━━━━━━━━━━━━━━━━━━━

உன் தரவு அங்கேயே இருக்கும்

• chrome.storage.local மூலம் 100% உள்ளூர் சேமிப்பு
• சேவையகம் இல்லை, கணக்கு இல்லை, ஒத்திசைவு இல்லை
• டெலிமெட்ரி இல்லை, பகுப்பாய்வு இல்லை, கண்காணிப்பு இல்லை, "அநாமதேயமாக்கப்பட்டது" கூட இல்லை
• நிறுவும்போது குறைந்தபட்ச அனுமதிகள்; நீ நினைவூட்டலை எல்லா இடங்களிலும் இயக்கினால் மட்டுமே மற்ற தளங்களுக்கான அணுகல் கேட்கப்படும்
• ஒரு விதிவிலக்கு, அதையும் நீயே இயக்கினால் மட்டும்: "Claude மூலம் உருவாக்கு" ஒரு தனித் தூண்டுதலின் உரையை, உன் சொந்தக் கணக்கின் கீழ் உன் கணினியில் நிறுவப்பட்ட Claude Code-க்கு அனுப்புகிறது. வரிசையோ வரலாறோ ஒருபோதும் இல்லை.

ஒரு விருப்பங்கள் பக்கம் உன் தரவை எப்போது வேண்டுமானாலும் JSON ஆக ஏற்றுமதி செய்ய, மற்றும் அதைத் திரும்ப இறக்குமதி செய்ய அனுமதிக்கிறது. காப்புநகல் உன் கட்டுப்பாட்டில் இருக்கும்.

━━━━━━━━━━━━━━━━━━━━━━━━

செயலற்ற நினைவூட்டல்: CLAUDE.AI-இல், அல்லது எங்கும்

கண்ணில் படாதது மனதிலிருந்தும் நீங்கும். ஒரு நுட்பமான, இழுக்கக்கூடிய அட்டை உன் இப்போதைய கவனத்தையும் அதன் அடுத்த படியையும் நினைவூட்டுகிறது. claude.ai-இல் இது இயல்பாக ஒரு புதிய உரையாடலைத் திறக்கும்போது தோன்றும், சூழல்-மாறுதல் நடக்கும் அதே நேரத்தில். விருப்பங்கள் பக்கத்தில் "அனைத்து தளங்களிலும் நினைவூட்டல்"ஐ இயக்கினால் அது மின்னஞ்சல், சமூக ஊடகம், வீடியோ தளங்களுக்கும் உன்னைப் பின்தொடரும்: கவனம் உண்மையில் தப்பிக்கும் இடமெல்லாம்.

ஒரு கிளிக்கில் நீக்கக்கூடியது. பக்க உள்ளடக்கம் ஒருபோதும் படிக்கப்படாது.

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock செய்யாதவை

• உன்னைத் தொந்தரவு செய்யும் அறிவிப்புகள் இல்லை
• கேமிஃபிகேஷன் இல்லை, தொடர்கள் இல்லை, மதிப்பெண் இல்லை
• நேரக் கண்காணிப்பு இல்லை
• உற்பத்தித்திறன் அறிக்கைகள் இல்லை
• உனக்காக முன்னுரிமைகளை மறுசீரமைக்கும் AI இல்லை

முடிவுகள் உன்னுடையதாகவே இருக்கும். Airlock ஒன்றை எடுக்க மட்டுமே உன்னை கட்டாயப்படுத்துகிறது.

━━━━━━━━━━━━━━━━━━━━━━━━

மொழி

20 மொழிகள்: ஆங்கிலம், எளிமைப்படுத்தப்பட்ட சீனம், இந்தி, ஸ்பானிஷ், பிரெஞ்சு, அரபு, பெங்காலி, பிரேசிலிய போர்த்துகீசம், ரஷியன், உருது, இந்தோனேசியன், ஜெர்மன், ஜப்பானியம், சுவாஹிலி, மராத்தி, தெலுங்கு, துருக்கியம், தமிழ், வியட்நாமியம் மற்றும் கொரியன், அரபு மற்றும் உருதுவுக்கு வலமிருந்து-இடமாக அமைப்புடன். Airlock இயல்பாக உன் உலாவி மொழியைப் பின்பற்றுகிறது; பாப்அப்பில் அல்லது விருப்பங்கள் பக்கத்தில் உள்ள கொடி பொட்டனிலிருந்து மற்றொன்றைத் தேர்ந்துகொள், அது மீள் ஏற்றம் இல்லாமல் அனைத்து இடங்களிலும் ஒரே நேரத்தில் மாறும்.

மொழிபெயர்ப்புகள் தானாகவே உருவாக்கப்பட்டன. உன் மொழியில் ஒரு வாக்கியம் தவறாக ஒலித்தால், திட்ட இணையதளத்தில் அதை வரி வரியாக சரிசெய்யலாம்: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

குறுக்குவழி

இயல்பாக Ctrl+Shift+E (Mac-இல் Cmd+Shift+E), chrome://extensions/shortcuts-இல் மாற்றக்கூடியது. அந்தக் கூட்டு உன் கணினியில் ஏற்கனவே எடுக்கப்பட்டிருந்தால், Chrome அதை இணைக்காது: Airlock உனக்குத் தெரிவிக்கும் (நிறுவும்போது விருப்பங்கள் பக்கம், ஐகானில் "!" பேட்ஜ்) மற்றும் சரியான அமைப்புக்கு உன்னை கொண்டு செல்லும். அதுவரை, ஐகானில் ஒரு கிளிக் அதையே செய்யும்.

━━━━━━━━━━━━━━━━━━━━━━━━

திறந்த மூலம், MIT உரிமம்: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

நிறுவல் எச்சரிக்கை பற்றி
Chrome-இன் Enhanced Safe Browsing இயக்கத்தில் இருந்தால், "This extension is not trusted by Enhanced Safe Browsing" என்பதைக் காணலாம். இது Airlock பற்றியது அல்ல, மேம்பாட்டாளர் கணக்கு புதியதாக இருப்பது பற்றியது; Airlock Chrome Web Store ஆல் மதிப்பாய்வு செய்யப்பட்டு அங்கீகரிக்கப்பட்டுள்ளது. சில மாதங்களுக்குள் இந்த செய்தி தானாகவே மறைந்துவிடும். "Continue to install" என்பதை பாதுகாப்பாக கிளிக் செய்யலாம்.
```

---

## Tiếng Việt (vi)

**Name** (45 characters max): `Airlock: Ghi lại và sắp xếp ưu tiên`

**Short description** (132 characters max): `Vùng đệm giữa ý tưởng và hành động. Ghi lại ý tưởng thay vì lao ngay vào nó. 100% cục bộ, không theo dõi.`

**Detailed description:**

```text
Bạn đang làm việc. Một ý tưởng xuất hiện. Bạn lao vào nó ngay. Hai giờ sau bạn nhận ra mình đã bỏ lỡ một việc cấp bách hơn.

Airlock tạo ra một vùng đệm giữa ý tưởng và hành động. Nó được thiết kế trước hết cho những người mắc ADHD: một ý tưởng xuất hiện, nó cảm giác cấp bách, và đến khi bạn tỉnh lại, việc bạn đang làm đã biến mất.

━━━━━━━━━━━━━━━━━━━━━━━━

CÁCH HOẠT ĐỘNG

Ctrl+Shift+E (Cmd+Shift+E trên Mac) từ bất kỳ tab nào. Nhập ý tưởng. Enter.

• Nếu bạn chưa có tiêu điểm nào, ý tưởng đó trở thành tiêu điểm của bạn.
• Nếu bạn đã có một tiêu điểm, Airlock chỉ hỏi một câu quan trọng duy nhất: việc này có nên làm trước không?

Ba câu trả lời có thể:
→ chuyển: ý tưởng mới trở thành tiêu điểm, ý tưởng cũ chuyển vào hàng đợi
→ xếp hàng: nó chờ đến lượt, tiêu điểm hiện tại của bạn vẫn được giữ nguyên
→ bỏ qua: bị gạt bỏ, và điều đó hoàn toàn bình thường

Các phím 1, 2 và 3 trả lời mà không cần chạm vào chuột. Nếu bạn đóng popup trước khi trả lời, ý tưởng vẫn được giữ lại, và một dấu "?" trên biểu tượng sẽ chờ bạn.

Khi bạn hoàn thành một tiêu điểm, một cú nhấp vào ✓ sẽ lưu nó vào lịch sử, và mục đầu tiên trong hàng đợi sẽ tự động thay vào vị trí đó. Nhấp nhầm? Mọi thao tác xoá đều có thể hoàn tác trong vài giây.

Popup hiển thị mười ý tưởng đầu tiên trong hàng đợi. Sau đó, một cú nhấp sẽ mở chế độ xem rộng: toàn bộ Airlock, toàn màn hình trong một tab, mọi ý tưởng đều hiện ra, luôn đồng bộ với popup.

━━━━━━━━━━━━━━━━━━━━━━━━

BẢO VỆ TIÊU ĐIỂM

Chuyển khỏi một tiêu điểm chưa xong chính là cách một ngày bị phân tán. Vì vậy, khi bạn chọn "chuyển", Airlock sẽ hỏi trước: tiêu điểm hiện tại của bạn đã xong chưa? Rồi: nó được lưu vào lịch sử và ý tưởng mới lên thay. Chưa: Airlock gợi ý xếp ý tưởng mới vào hàng đợi, và vẫn giữ một lựa chọn nhẹ nhàng hơn là "vẫn chuyển" cho những lúc bạn thực sự muốn vậy.

Câu hỏi này được bỏ qua khi ý tưởng mới rõ ràng là cùng một chủ đề. Việc kiểm tra này chỉ diễn ra trên máy của bạn: dùng mô hình AI cục bộ có sẵn trong Chrome nếu máy bạn hỗ trợ (tiếng Anh, Tây Ban Nha, Nhật, Đức, Pháp), hoặc nếu không thì bằng cách so sánh các từ của hai ý tưởng. Không có gì được gửi đi bất cứ đâu. Bạn có thể tắt tính năng này hoặc thay đổi độ nhạy của nó trong trang Tuỳ chọn.

━━━━━━━━━━━━━━━━━━━━━━━━

MẮC KẸT Ở "BẮT ĐẦU TỪ ĐÂU?"

Chia tiêu điểm của bạn thành các bước nhỏ, cụ thể, bước đầu tiên làm được trong dưới mười phút. Bước tiếp theo sẽ hiện ra dưới tiêu điểm của bạn, trong popup, trong chú giải biểu tượng và trên thẻ nhắc nhở. Không cần AI; một cầu nối Claude Code cục bộ không bắt buộc có thể soạn sẵn các bước đó cho bạn, bằng ngôn ngữ giao diện của bạn.

━━━━━━━━━━━━━━━━━━━━━━━━

VÌ SAO ĐIỀU NÀY KHÁC BIỆT

Sự vướng víu chính là thứ giết chết các công cụ năng suất. Nếu việc ghi lại một suy nghĩ đồng nghĩa với mở một ứng dụng, chọn một dự án và điền ba trường thông tin, bạn sẽ không làm điều đó. Bạn sẽ lao thẳng vào ý tưởng thay vì vậy.

Airlock sống bên trong Chrome, mở ra bằng bàn phím, và chỉ hỏi đúng một thứ: nội dung của ý tưởng. Không cần chọn dự án, không hạn chót, không gán mức ưu tiên, không cần tạo tài khoản.

Đây không phải một công cụ quản lý việc cần làm. Đây là một vùng đệm.

━━━━━━━━━━━━━━━━━━━━━━━━

DỮ LIỆU CỦA BẠN LUÔN Ở TẠI CHỖ

• Lưu trữ 100% cục bộ qua chrome.storage.local
• Không máy chủ, không tài khoản, không đồng bộ
• Không số liệu theo dõi, không phân tích, không theo dõi, ngay cả khi "ẩn danh"
• Quyền tối thiểu khi cài đặt; quyền truy cập các trang khác chỉ được hỏi nếu bạn bật nhắc nhở ở mọi nơi
• Một ngoại lệ duy nhất, và chỉ khi bạn tự bật nó: "Tạo với Claude" gửi nội dung của một ý tưởng duy nhất đến Claude Code, được cài trên máy của bạn dưới tài khoản của chính bạn. Không bao giờ gửi hàng đợi, không bao giờ gửi lịch sử.

Trang Tuỳ chọn cho phép bạn xuất dữ liệu ra JSON vào bất cứ lúc nào, và nhập lại. Bản sao lưu luôn nằm trong tay bạn.

━━━━━━━━━━━━━━━━━━━━━━━━

NHẮC NHỞ THỤ ĐỘNG: TRÊN CLAUDE.AI, HOẶC Ở MỌI NƠI

Khuất mắt thì quên lòng. Một thẻ nhỏ, kín đáo, có thể kéo đi được, nhắc bạn về tiêu điểm hiện tại và bước tiếp theo của nó. Trên claude.ai, nó hiện ra theo mặc định khi bạn mở một cuộc trò chuyện mới, đúng vào thời điểm việc chuyển đổi ngữ cảnh xảy ra. Bật "nhắc nhở trên mọi trang" trong trang Tuỳ chọn và nó sẽ theo bạn đến email, mạng xã hội, các trang video: bất cứ nơi nào sự tập trung thực sự bị cuốn đi.

Có thể đóng bằng một cú nhấp. Nội dung trang không bao giờ bị đọc.

━━━━━━━━━━━━━━━━━━━━━━━━

NHỮNG GÌ AIRLOCK KHÔNG LÀM

• Không có thông báo làm gián đoạn bạn
• Không game hoá, không chuỗi ngày liên tiếp, không điểm số
• Không theo dõi thời gian
• Không có báo cáo năng suất
• Không có AI sắp xếp lại các ưu tiên thay bạn

Các quyết định vẫn thuộc về bạn. Airlock chỉ buộc bạn phải đưa ra một quyết định.

━━━━━━━━━━━━━━━━━━━━━━━━

NGÔN NGỮ

20 ngôn ngữ: tiếng Anh, tiếng Trung giản thể, tiếng Hindi, tiếng Tây Ban Nha, tiếng Pháp, tiếng Ả Rập, tiếng Bengal, tiếng Bồ Đào Nha (Brazil), tiếng Nga, tiếng Urdu, tiếng Indonesia, tiếng Đức, tiếng Nhật, tiếng Swahili, tiếng Marathi, tiếng Telugu, tiếng Thổ Nhĩ Kỳ, tiếng Tamil, tiếng Việt và tiếng Hàn, với bố cục từ phải sang trái cho tiếng Ả Rập và tiếng Urdu. Airlock theo ngôn ngữ trình duyệt của bạn theo mặc định; chọn một ngôn ngữ khác bằng nút cờ trong popup hoặc trong trang Tuỳ chọn, và nó sẽ chuyển ở mọi nơi ngay lập tức, không cần tải lại.

Các bản dịch được tạo tự động. Nếu một câu nghe không đúng trong ngôn ngữ của bạn, bạn có thể chỉnh sửa nó từng dòng trên trang web của dự án: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

PHÍM TẮT

Theo mặc định là Ctrl+Shift+E (Cmd+Shift+E trên Mac), có thể thay đổi tại chrome://extensions/shortcuts. Nếu tổ hợp này đã bị chiếm trên máy của bạn, Chrome sẽ không gán nó: Airlock sẽ báo cho bạn biết (trang Tuỳ chọn khi cài đặt, biểu tượng "!" trên icon) và đưa bạn đến đúng phần cài đặt cần thiết. Trong lúc đó, một cú nhấp vào biểu tượng cũng làm được điều tương tự.

━━━━━━━━━━━━━━━━━━━━━━━━

Mã nguồn mở, giấy phép MIT: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

Về cảnh báo khi cài đặt
Nếu Enhanced Safe Browsing của Chrome đang được bật, bạn có thể thấy cảnh báo rằng tiện ích này chưa được Enhanced Safe Browsing tin tưởng. Điều này liên quan đến việc tài khoản nhà phát triển còn mới, không phải do Airlock, vì tiện ích đã được Chrome Web Store xem xét và phê duyệt. Thông báo này sẽ tự biến mất sau vài tháng. Bạn có thể yên tâm tiếp tục cài đặt.
```

---

## 한국어 (ko)

**Name** (45 characters max): `Airlock: 포착 및 우선순위 지정`

**Short description** (132 characters max): `충동과 행동 사이에 두는 에어락. 바로 뛰어들지 말고 아이디어를 먼저 기록하세요. 100% 로컬, 텔레메트리 없음.`

**Detailed description:**

```text
일하고 있다. 아이디어가 떠오른다. 바로 그 속으로 뛰어든다. 두 시간 후, 더 급한 일을 놓쳤다는 걸 깨닫는다.

Airlock는 충동과 행동 사이에 완충 구역을 둡니다. 이는 먼저 ADHD가 있는 사람들을 위해 설계되었습니다: 아이디어가 떠오르고, 그것이 긴급하게 느껴지고, 거기서 빠져나올 때쯤이면 하던 일은 이미 사라져 있습니다.

━━━━━━━━━━━━━━━━━━━━━━━━

작동 방식

어느 탭에서든 Ctrl+Shift+E (Mac에서는 Cmd+Shift+E). 충동을 입력하세요. Enter.

• 현재 포커스가 없다면, 그 충동이 당신의 포커스가 됩니다.
• 이미 포커스가 있다면, Airlock는 단 하나의 중요한 질문을 합니다: 이게 먼저일까요?

세 가지 가능한 답:
→ 전환: 새 충동이 포커스가 되고, 이전 것은 대기열로 이동합니다
→ 대기열: 차례를 기다리고, 현재 포커스는 그대로 유지됩니다
→ 보류: 흘려보내요, 그래도 전혀 괜찮습니다

1, 2, 3 키로 마우스 없이 답할 수 있습니다. 답하기 전에 팝업을 닫아도 충동은 그대로 저장되고, 아이콘의 "?"가 당신을 기다립니다.

포커스를 끝내면, ✓를 한 번 클릭하면 보관되고 대기열의 첫 항목이 자동으로 그 자리를 대신합니다. 잘못 클릭했나요? 모든 삭제는 몇 초 동안 취소할 수 있습니다.

팝업은 대기열의 처음 10개 아이디어를 보여줍니다. 그 이상은 클릭 한 번으로 와이드 뷰가 열립니다: 탭에서 전체 화면으로 보는 Airlock 전체, 모든 아이디어를 한눈에, 팝업과 계속 동기화됩니다.

━━━━━━━━━━━━━━━━━━━━━━━━

포커스 가드

완료되지 않은 포커스에서 벗어나는 것이야말로 하루가 흩어지는 원인입니다. 그래서 "전환"을 선택하면, Airlock는 먼저 묻습니다: 현재 포커스가 완료됐나요? 네: 그것은 보관되고 새 아이디어가 이어받습니다. 아직: Airlock는 새 아이디어를 대기열에 넣자고 제안하며, 정말로 그렇게 하고 싶을 때를 위해 조용한 "그래도 전환" 선택지를 남겨둡니다.

새 아이디어가 분명히 같은 주제일 때는 이 질문을 건너뜁니다. 이 확인은 오직 당신의 컴퓨터에서만 이루어집니다: 컴퓨터가 지원하면 Chrome 내장 로컬 AI 모델(영어, 스페인어, 일본어, 독일어, 프랑스어 지원)을 사용하고, 그렇지 않으면 두 아이디어의 단어를 비교합니다. 어디로도 아무것도 전송되지 않습니다. 옵션 페이지에서 가드를 끄거나 감도를 바꿀 수 있습니다.

━━━━━━━━━━━━━━━━━━━━━━━━

"어디서부터 시작해야 할지 모르겠을 때"

포커스를 작고 구체적인 단계로 나누세요, 첫 단계는 10분 안에 할 수 있어야 합니다. 다음 단계는 포커스 아래, 팝업, 아이콘 툴팁, 알림 카드에 나타납니다. AI는 필요 없습니다; 선택적인 로컬 Claude Code 연동을 사용하면 당신의 인터페이스 언어로 단계의 초안을 만들어 줄 수 있습니다.

━━━━━━━━━━━━━━━━━━━━━━━━

무엇이 다른가

마찰이야말로 생산성 도구를 죽이는 요인입니다. 생각을 기록하는 데 앱을 열고, 프로젝트를 고르고, 세 개의 항목을 채워야 한다면, 당신은 그렇게 하지 않을 겁니다. 대신 그 충동에 바로 뛰어들겠죠.

Airlock는 Chrome 안에 살고, 키보드로 열리며, 단 한 가지만 요구합니다: 충동의 텍스트. 프로젝트를 고를 필요도, 마감일도, 우선순위를 지정할 필요도, 계정을 만들 필요도 없습니다.

이것은 작업 관리자가 아닙니다. 에어락입니다.

━━━━━━━━━━━━━━━━━━━━━━━━

당신의 데이터는 그대로 남습니다

• chrome.storage.local을 통한 100% 로컬 저장
• 서버 없음, 계정 없음, 동기화 없음
• 텔레메트리 없음, 분석 없음, 추적 없음, "익명화"된 것조차 없음
• 설치 시 최소 권한만 요청; 다른 사이트 접근은 "모든 사이트에서 알림"을 켤 때만 요청됩니다
• 단 하나의 예외는, 당신이 직접 켰을 때만 적용됩니다: "Claude로 생성"은 단 하나의 충동 텍스트를 당신의 기기에, 당신 자신의 계정으로 설치된 Claude Code로 전송합니다. 대기열이나 기록은 절대 전송되지 않습니다.

옵션 페이지에서는 언제든 데이터를 JSON으로 내보내고 다시 가져올 수 있습니다. 백업은 항상 당신의 통제 아래 있습니다.

━━━━━━━━━━━━━━━━━━━━━━━━

조용한 알림: claude.ai에서, 또는 모든 사이트에서

눈에 보이지 않으면 잊혀집니다. 눈에 띄지 않게, 드래그 가능한 카드가 현재 포커스와 다음 단계를 알려줍니다. claude.ai에서는 새 대화를 열 때 기본적으로 표시됩니다, 바로 맥락 전환이 일어나는 그 순간에요. 옵션 페이지에서 "모든 사이트에서 알림"을 켜면 이메일, 소셜 미디어, 동영상 사이트까지, 주의가 실제로 흩어지는 곳 어디든 따라옵니다.

클릭 한 번으로 닫을 수 있습니다. 페이지 내용은 절대 읽지 않습니다.

━━━━━━━━━━━━━━━━━━━━━━━━

Airlock가 하지 않는 것

• 알림으로 방해하지 않음
• 게임화, 연속 기록, 점수 없음
• 시간 추적 없음
• 생산성 보고서 없음
• AI가 당신의 우선순위를 대신 재배열하지 않음

결정은 항상 당신의 것입니다. Airlock는 단 하나의 결정을 내리도록 요구할 뿐입니다.

━━━━━━━━━━━━━━━━━━━━━━━━

언어

20개 언어 지원: 영어, 중국어 간체, 힌디어, 스페인어, 프랑스어, 아랍어, 벵골어, 브라질 포르투갈어, 러시아어, 우르두어, 인도네시아어, 독일어, 일본어, 스와힐리어, 마라티어, 텔루구어, 터키어, 타밀어, 베트남어, 한국어, 아랍어와 우르두어는 오른쪽에서 왼쪽으로 읽는 레이아웃을 지원합니다. Airlock는 기본적으로 브라우저 언어를 따르며, 팝업이나 옵션 페이지의 국기 버튼에서 다른 언어를 선택하면 새로고침 없이 모든 화면이 한꺼번에 바뀝니다.

번역은 자동으로 생성되었습니다. 당신의 언어로 어색하게 들리는 문장이 있다면, 프로젝트 웹사이트에서 한 줄씩 수정할 수 있습니다: https://kiyomasanaki.github.io/airlock/translate.html

━━━━━━━━━━━━━━━━━━━━━━━━

단축키

기본값은 Ctrl+Shift+E (Mac에서는 Cmd+Shift+E)이며, chrome://extensions/shortcuts에서 변경할 수 있습니다. 그 조합이 당신의 기기에서 이미 사용 중이라면 Chrome은 그것을 연결하지 않습니다: Airlock가 알려주고(설치 시 옵션 페이지, 아이콘의 "!" 배지) 올바른 설정으로 안내합니다. 그동안은 아이콘을 클릭하는 것으로도 같은 효과를 낼 수 있습니다.

━━━━━━━━━━━━━━━━━━━━━━━━

오픈 소스, MIT 라이선스: https://github.com/kiyomasanaki/airlock

━━━━━━━━━━━━━━━━━━━━━━━━

설치 경고에 대하여
Chrome의 "고급 보호 모드(향상된 보안 브라우징)"가 켜져 있다면 "이 확장 프로그램은 향상된 보안 브라우징에서 신뢰하지 않습니다"라는 메시지를 볼 수 있습니다. 이는 개발자 계정이 새로 생성되었다는 것과 관련이 있을 뿐, Airlock 자체와는 관련이 없으며, Airlock는 이미 Chrome 웹 스토어의 검토와 승인을 받았습니다. 이 메시지는 몇 달 안에 자동으로 사라집니다. 안심하고 "설치 계속하기"를 클릭하면 됩니다.
```
