# Insecure Patterns — What to Avoid

> **Do not use in production.** These patterns are shown only so you can recognize and avoid them.

---

## What this document is for

This page describes **what vulnerable code looks like** and how to test the demo app safely. For concrete impact (no-click execution, phishing, session theft), see [01](./01-actions-without-user-interaction.md), [02](./02-internal-phishing.md), and [03](./03-session-hijacking.md).

---

## 1. Rendering raw HTML from user input

**What it looks like**

User or API content is inserted into the DOM as HTML, with no validation or sanitization.

- **Vanilla:** `element.innerHTML = userContent`
- **React:** `dangerouslySetInnerHTML={{ __html: text }}` with unsanitized `text`

**Why it’s dangerous**

The browser parses the string as HTML. If it contains executable markup (e.g. `<img onerror="...">`, `<svg onload="...">`), that code runs in your page context. There is no separation between “data” and “code.”

---

## 2. Important: `<script>` and `innerHTML`

In HTML5, **`<script>` elements added via `innerHTML` are not executed.** So `<script>alert(1)</script>` injected via `innerHTML` will not run.

To see the vulnerability in the demo, use markup that runs when the element is parsed, for example:

- `<img src="x" onerror="alert(1)">` — `onerror` runs when the image fails to load.
- `<audio src="x" onerror="alert(1)">` — same idea for another media tag.

Note: `<svg onload="alert(1)">` is often listed in cheat sheets, but **`onload` on SVG is unreliable when the markup is inserted via `innerHTML`** (including React’s `dangerouslySetInnerHTML`). Prefer `onerror` on `img`, `audio`, `video`, etc., for demos that must run after insertion.

---

## 3. How to test in the demo app

- **Insecure route (`/insecure`):** Paste one of the examples from [01](./01-actions-without-user-interaction.md), [02](./02-internal-phishing.md), or [03](./03-session-hijacking.md) into the todo input and add the item. The code will run.
- **Secure route (`/secure`):** The same input is sanitized and will not run.
- **Token in console:** Open DevTools → Console and run `localStorage.getItem('auth_token')` to see the fake token the app uses for demos.

---

## Key takeaway

Rendering unsanitized HTML allows arbitrary script execution. Avoid `innerHTML` / `dangerouslySetInnerHTML` with user or third-party data. When you must use HTML, sanitize first (see [safe-patterns.md](./safe-patterns.md)).
