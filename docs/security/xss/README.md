# XSS (Cross-Site Scripting) — Educational Examples

---

> **⚠️ Educational use only**  
> The code and examples in this documentation are intentionally simplified for learning purposes. They are **not** suitable for production use. Do not copy insecure patterns into real applications.

---

## Purpose of this documentation

This folder contains **educational material** about Cross-Site Scripting (XSS) in frontend applications. The goal is to explain what XSS is, why it matters, and how to prevent it—without providing exploitation instructions or malicious payloads.

The content is kept **separate** from the main application code so that:

- Production or demo code remains clearly distinct from reference examples.
- Readers can study security concepts without confusion.
- The repository stays safe and professional for public use.

---

## What is XSS in a frontend context?

**Cross-Site Scripting (XSS)** is a type of vulnerability where an attacker can cause a website to run script code in the context of another user’s browser. From the frontend perspective:

1. **User-controlled or third-party data** (e.g. from inputs, URLs, or APIs) is included in the page.
2. That data is **interpreted as code** (HTML/JavaScript) instead of plain text.
3. The browser **executes** that code with the same privileges as the application (same origin, access to cookies, `localStorage`, etc.).

So the **frontend is a real attack vector**: any place where unsanitized data is rendered as HTML or passed into dynamic code can become an XSS entry point.

---

## Why is rendering unsanitized HTML dangerous?

When the frontend inserts raw HTML into the DOM (e.g. via `innerHTML` or React’s `dangerouslySetInnerHTML` without sanitization):

- **Tags** such as `<script>`, `<img>`, `<svg>`, or elements with **event handlers** (e.g. `onerror`, `onload`) can run JavaScript.
- That JavaScript runs **in the user’s session**: it can read or modify same-origin data (e.g. tokens in `localStorage`, cookies), change the page, or trigger actions on behalf of the user.

Therefore, **any** user or third-party content that can influence the page must be either:

- Rendered as **plain text** (no HTML), or  
- **Sanitized** with a well-maintained library (e.g. DOMPurify) before being used as HTML.

---

## How this documentation relates to the demo app

The repository includes a **small demo application** that illustrates these ideas in a controlled way:

| Concept | In the demo app |
|--------|------------------|
| **Rendering user input** | A simple TODO list where each item is rendered from user input. |
| **Insecure version** | The “insecure” route uses `dangerouslySetInnerHTML` **without** sanitization to show that whatever is typed can be interpreted as HTML/script. |
| **Secure version** | The “secure” route uses the same UI but **sanitizes** content (e.g. with DOMPurify) before rendering, so only safe markup is allowed. |
| **Sensitive data in the browser** | The app may store a **fake** token in `localStorage` for demonstration. In a real app, such data could be targeted by XSS; the docs explain the risk, not exploitation. |
| **No backend required** | The demo runs entirely in the browser with local state, so all risks shown are frontend-only. |

The files in this folder (**insecure-examples.md** and **safe-examples.md**) describe **generic patterns** that match what the demo does: they explain risky vs. safe ways to handle content, without tying the narrative to specific payloads or attack steps.

---

## Contents of this folder

| File | Purpose |
|------|--------|
| **README.md** (this file) | Overview of XSS, why unsanitized HTML is dangerous, and how the docs relate to the demo app. |
| **[insecure-examples.md](./insecure-examples.md)** | Intentionally insecure patterns: what they look like and **what risk they introduce** (no exploitation details). |
| **[safe-examples.md](./safe-examples.md)** | Safe alternatives: plain-text rendering, sanitization, and how they remove the risks shown in the insecure examples. |

---

## Further reading (conceptual)

For a formal treatment of XSS, the [OWASP Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) page provides definitions and categories (e.g. reflected, stored, DOM-based). We reference it here for context only; this documentation does not rely on or reproduce OWASP payloads or step-by-step exploitation guides.

---

*This documentation is maintained for educational use only. Use it to build secure applications and to teach others; do not use it to exploit systems or users.*
