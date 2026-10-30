# Fiche Chrome Web Store — français

Localisation française de la fiche. La fiche principale est
[`DESCRIPTION-EN.md`](DESCRIPTION-EN.md).

> Ce fichier reste en français : c'est le texte destiné aux utilisateurs francophones
> du Store, pas de la documentation projet.

## Nom de l'extension

```
Airlock — Capture & priorise
```

*(45 caractères max au Store ; ici 28)*

---

## Description courte

À coller dans le champ « Description courte ». **132 caractères maximum.**

```
Un sas entre l'impulsion et l'action. Capture l'idée qui arrive au lieu de plonger dedans. 100 % local, zéro télémétrie.
```

*(120 caractères)*

---

## Description détaillée

À coller dans le champ « Description détaillée ». 16 000 caractères maximum.

```
Tu es en train de travailler. Une idée arrive. Tu fonces dedans. Deux heures plus tard, tu réalises que tu as laissé tomber quelque chose de plus urgent.

Airlock intercale un sas entre l'impulsion et l'action.

━━━━━━━━━━━━━━━━━━━━━━━━

COMMENT ÇA MARCHE

Ctrl+Shift+Q depuis n'importe quel onglet. Tu tapes l'impulsion. Entrée.

• Si tu n'as pas de focus en cours, l'impulsion devient ton focus.
• Si tu as déjà un focus, Airlock te pose la seule question qui compte : est-ce que ça passe devant ?

Trois réponses possibles :
→ je switch — la nouvelle impulsion devient le focus, l'ancien part en file d'attente
→ file d'attente — ça attend son tour, ton focus actuel est préservé
→ laisser tomber — jeté, et c'est très bien

Les touches 1, 2 et 3 répondent sans toucher la souris. Si tu fermes le popup avant de répondre, l'impulsion est gardée et un « ? » sur l'icône t'attend.

Quand tu termines ton focus, un clic sur ✓ l'archive et le premier item de la file prend automatiquement sa place. Un clic de travers ? Toute suppression s'annule pendant quelques secondes.

━━━━━━━━━━━━━━━━━━━━━━━━

BLOQUÉ SUR « PAR OÙ JE COMMENCE ? »

Découpe ton focus en petites étapes concrètes — la première faisable en moins de dix minutes. La prochaine étape s'affiche alors sous ton focus, dans le popup, dans l'infobulle de l'icône et dans la carte de rappel. Aucune IA nécessaire ; un pont local optionnel vers Claude Code peut proposer les étapes à ta place.

━━━━━━━━━━━━━━━━━━━━━━━━

POURQUOI C'EST DIFFÉRENT

La friction, c'est ce qui tue les outils de productivité. Si capturer une pensée demande d'ouvrir une app, choisir un projet, remplir trois champs, tu ne le feras pas. Tu plongeras dans l'impulsion.

Airlock vit dans Chrome, s'ouvre au clavier, et ne demande qu'une chose : le texte de l'impulsion. Pas de projet à choisir, pas de date d'échéance, pas de priorité à assigner, pas de compte à créer.

Ce n'est pas un gestionnaire de tâches. C'est un sas.

━━━━━━━━━━━━━━━━━━━━━━━━

TES DONNÉES NE BOUGENT PAS

• Stockage 100 % local via chrome.storage.local
• Aucun serveur, aucun compte, aucune synchronisation
• Aucune donnée ne quitte ta machine, jamais
• Aucune télémétrie, aucun analytics, aucun tracking — même « anonymisé »
• Permissions minimales à l'installation ; l'accès aux autres sites n'est demandé que si tu actives le rappel partout

Une page Options permet d'exporter tes données en JSON à tout moment, et de les réimporter. La sauvegarde reste sous ton contrôle.

━━━━━━━━━━━━━━━━━━━━━━━━

RAPPEL PASSIF — SUR CLAUDE.AI, OU PARTOUT

Loin des yeux, loin du cerveau. Une carte discrète et déplaçable te rappelle ton focus et sa prochaine étape. Sur claude.ai elle s'affiche par défaut, quand tu ouvres une nouvelle conversation — le moment précis où le context-switching se produit. Active « rappel sur tous les sites » dans la page Options et elle te suit sur les mails, les réseaux, les sites de vidéos : là où l'attention s'échappe vraiment.

Fermable d'un clic. Aucun contenu de page n'est lu.

━━━━━━━━━━━━━━━━━━━━━━━━

CE QU'AIRLOCK NE FAIT PAS

• Pas de notifications qui t'interrompent
• Pas de gamification, pas de streaks, pas de score
• Pas de suivi du temps
• Pas de rapports de productivité
• Pas d'IA qui réorganise tes priorités à ta place

Les décisions restent les tiennes. Airlock ne fait que t'obliger à en prendre une.

━━━━━━━━━━━━━━━━━━━━━━━━

RACCOURCI

Ctrl+Shift+Q par défaut, modifiable dans chrome://extensions/shortcuts si le raccourci est déjà pris.

━━━━━━━━━━━━━━━━━━━━━━━━

Code source ouvert, licence MIT.
```

---

## Champs de formulaire

| Champ Store | Valeur |
|---|---|
| **Catégorie** | Productivité |
| **Langue** | Français |
| **Objectif unique** (single purpose) | Capturer et prioriser localement des intentions de travail saisies par l'utilisateur, afin de réduire le changement de contexte. |
| **Justification de la permission `storage`** | Sauvegarder localement le focus en cours, la file de priorités et l'historique des items terminés. Aucune donnée n'est transmise. |
| **Justification de l'accès à `claude.ai`** | Afficher un bandeau de rappel du focus en cours lors de l'ouverture d'une nouvelle conversation. Aucun contenu de page n'est lu ni transmis. |
| **Justification de la permission `scripting`** | Enregistrer la carte de rappel du focus sur les autres sites, uniquement après activation de l'option dans la page Options et accord de l'accès optionnel aux sites. Aucun contenu de page n'est lu ni transmis. |
| **Justification de l'accès optionnel (`https://*/*`, `http://*/*`)** | Demandé à l'exécution uniquement quand l'utilisateur active « rappel sur tous les sites » ; sert exclusivement à afficher la carte de rappel. Retiré quand l'option est désactivée. |
| **Justification de `nativeMessaging` (optionnelle)** | Demandée à l'exécution uniquement au clic sur « Générer avec Claude », pour joindre un hôte local installé par l'utilisateur lui-même. Inerte sinon. |
| **Utilisation des données** | Cocher « Cette extension ne collecte pas et n'utilise pas les données utilisateur ». |
| **URL de la politique de confidentialité** | *(à renseigner — voir `legal/README.md`)* |
