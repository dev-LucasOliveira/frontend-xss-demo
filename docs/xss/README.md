# XSS — Educational Documentation

> **Educational use only.** The examples in this folder are for learning. Do not use insecure patterns in production.

---

## What is XSS?

**Cross-Site Scripting (XSS)** means an attacker can run script code inside your application’s page. From the frontend:

- User or third-party data is rendered as **HTML** (or passed into code) without being sanitized.
- The browser **executes** that content as script, with the same privileges as your app (same origin, cookies, storage).

So the frontend is a real attack vector: any place where unsanitized data becomes HTML or executable code can be abused.

**Why it matters:** The browser trusts your application. Injected code is trusted the same way. That is why XSS leads to session theft, phishing inside your app, and actions performed in the user’s name without their consent.

---

## How the demo app illustrates this

| Part of the app | Purpose |
|-----------------|--------|
| **Route `/insecure`** | Renders todo text as raw HTML (`dangerouslySetInnerHTML`). You can paste the examples from the docs to see impact. |
| **Route `/secure`** | Same UI, but content is sanitized (e.g. DOMPurify). The same input does not run as code. |
| **Legacy** | `/inseguro` and `/seguro` redirect to `/insecure` and `/secure`. |
| **Fake token in `localStorage`** | Shows that script on the page can read tokens; used only for demonstration. |

All examples in this folder are **controlled and non-malicious**. They demonstrate risk, not exploitation.

---

## Contents

| Document | What it covers |
|----------|----------------|
| [01-actions-without-user-interaction.md](./01-actions-without-user-interaction.md) | Code runs without any click; automatic requests and DOM changes. |
| [02-internal-phishing.md](./02-internal-phishing.md) | Fake UI (e.g. “session expired”) inside your app; why users trust it. |
| [03-session-hijacking.md](./03-session-hijacking.md) | Reading tokens from storage and using them in requests; account takeover risk. |
| [insecure-patterns.md](./insecure-patterns.md) | What vulnerable code looks like; how to test safely in the demo. |
| [safe-patterns.md](./safe-patterns.md) | Plain text, sanitization, and other ways to prevent XSS. |

Read the numbered guides for **real-world impact**. Use **insecure-patterns** and **safe-patterns** for **code-level** do’s and don’ts.
