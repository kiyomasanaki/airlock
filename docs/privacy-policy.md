# Privacy Policy - Airlock Extension

**Last updated: November 13, 2026**

## Summary

Airlock stores everything locally. **We operate no server, collect nothing, and have no access to your data.** All information you enter (impulses, focus items, completed tasks) is stored exclusively in your browser's local storage on your machine.

**One optional feature is an exception, and it is off unless you install it:** the methodology generator sends the text of a single impulse to Anthropic, through the Claude Code CLI running on your own machine, under your own Anthropic account. See "Methodology generation" below. If you never install the native host, no data ever leaves your device.

## Data we collect

We do NOT collect any data. The extension stores the following information locally on your device only:

- Text you type as "impulses", "focus", or queue items
- Timestamps of when items are created and completed
- Generated methodologies and which of their steps you have ticked off
- Your preferences (keyboard shortcut, display options, interface language, focus guard settings)
- How many times you chose "switch anyway" past the focus guard (a plain local count, shown only to you on the Options page)

This data is stored using the Chrome `storage.local` API and remains on your computer. It is never transmitted to us or to any server we control: we have none.

## Methodology generation (optional)

Airlock can turn an impulse into a numbered methodology. This feature is **not active by default**: it requires you to separately install a native messaging host on your machine, and to have [Claude Code](https://claude.com/claude-code) installed.

When, and only when, you click "Generate with Claude":

- The text of **that single impulse** is placed into a prompt and passed to the `claude` command-line tool running locally on your machine
- That tool sends the prompt to **Anthropic**, using **your own Anthropic account and its own authentication**. Airlock has no account, no API key, and no server in this path
- The returned steps are stored locally, like the rest of your data

What this means concretely:

- Your other impulses, your queue and your history are **never** sent, only the one impulse you act on
- The data goes to Anthropic, so **Anthropic's privacy policy and terms apply to that exchange**: <https://www.anthropic.com/legal/privacy>
- Airlock never sees the prompt or the response. Nothing is logged, and the native host writes nothing to disk
- If you do not install the native host, this feature is inert and no network call is ever made

If you want the extension to stay strictly local, simply do not install the native host.

## Focus guard (local only)

When you switch away from a focus that is not done, Airlock may first check whether the new idea is the same subject as your focus. That check runs **entirely on your machine**:

- with Chrome's built-in on-device model (Gemini Nano, through Chrome's Prompt API) and its on-device language detector, only if your computer supports them and you downloaded them yourself from the Options page;
- otherwise with a simple word comparison done by the extension.

Nothing is sent to us, to Google or to anyone else: Chrome runs these models locally, and the extension never makes a network call for this feature. The texts compared are only your current focus and the new idea. You can turn the guard off on the Options page.

## Translation fixes page (website)

The project website has a page where anyone can suggest better translations of the interface: <https://kiyomasanaki.github.io/airlock/translate.html>. It is a page of the website, not part of the extension, and the extension never sends anything to it.

- What you type there stays in your browser (its local storage) while you edit
- Nothing is sent unless you choose to: the "Open a GitHub issue" button opens GitHub with your corrections pre-filled, and you decide whether to submit them from your own GitHub account. "Copy" only puts the text in your clipboard
- Anything you submit on GitHub is public and subject to GitHub's privacy statement: <https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement>

## Data we do NOT collect

- We do not collect personally identifiable information (PII)
- We do not collect IP addresses
- We do not use analytics or telemetry
- We do not use cookies
- We do not share data with third parties
- We do not sell data (we have no data to sell)
- We do not use advertising networks
- We do not access your browsing history
- We do not read, log or transmit content from websites you visit. The extension only adds its own reminder card: on claude.ai pages, and on other websites only if you turn that option on

## Permissions explained

The extension requests the following Chrome permissions at installation:

- **`storage`**: To save your impulses and focus items locally on your device
- **`scripting`**: To show the focus reminder card on other websites, only once you have turned that option on and granted site access (see below). On its own it gives access to no website
- **`host_permissions: https://claude.ai/*`**: To display a contextual banner on claude.ai pages showing your current focus. The extension does not read, log, or transmit any content from claude.ai

And these **optional** permissions, which Chrome only asks you for when you use the matching feature, and which you can revoke at any time:

- **Access to all websites (`https://*/*`, `http://*/*`)**: Requested only if you enable "Focus reminder on every site" on the Options page. Used solely to display the reminder card; no page content is read, logged or transmitted. Turning the option off removes the permission
- **`nativeMessaging`**: Requested only the first time you click "Generate with Claude". Used to reach the optional local host that runs the Claude Code CLI. Without that host installed, it does nothing

## Your rights

Because your data stays on your device (barring the optional methodology generation described above):

- **Right to access**: All your data is visible in the extension popup and on the options page
- **Right to erasure**: Click "Reset all" in the popup, or uninstall the extension to delete all data permanently
- **Right to portability**: The options page lets you export all your data as JSON at any time, and import it back
- **Right to rectification**: Edit or delete any item directly in the extension

## Data retention

Data is retained on your device until you delete it manually or uninstall the extension. There is no server-side retention because we have no servers.

## Children's privacy

The extension is not directed at children under 13. We do not knowingly collect any information from anyone, including children.

## Security

Your data is protected by Chrome's standard local storage isolation. We recommend keeping your operating system and Chrome browser up to date.

## Changes to this policy

If we ever change this policy (e.g., if a future version adds cloud sync as an optional feature), we will update this document and notify users via the extension update notes. Cloud sync, if ever added, will always be opt-in.

## Contact

For privacy questions or concerns:
- Developer: kiyomasanaki
- Email: kiyo_masanaki_ghadmin@devops-evo.aleeas.com
- Website: https://kiyomasanaki.github.io/airlock/

## GDPR / CCPA compliance

Because the extension collects no personal data and the developer operates no server, GDPR (EU) and CCPA (California) obligations on the developer are minimal. You retain full control of your data at all times. The lawful basis for the local processing performed by the extension on your device is your consent, expressed by installing and using the extension.

Methodology generation is the only transfer of data off your device. It is optional, requires a deliberate installation on your part, and runs under your own Anthropic account: the controller for that processing is Anthropic, not the developer of Airlock. Its lawful basis is your consent, expressed by installing the native host and then by each click on "Generate with Claude".
