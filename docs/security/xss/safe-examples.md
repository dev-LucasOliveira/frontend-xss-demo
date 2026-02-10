# Safe Examples — Recommended Practices

---

> **✅ Use these patterns**  
> This document describes **safe** ways to handle user- or third-party content in the frontend. These approaches prevent XSS when applied consistently.

---

Here we show **correct** approaches: rendering content as plain text, sanitizing HTML when you must use it, and related frontend practices. Each section contrasts with the insecure patterns in **[insecure-examples.md](./insecure-examples.md)** and explains what changes and why the risk is removed.

---

## 1. Render as plain text (default choice)

**What to do**

Treat user or external content as **data**, not as HTML. The browser will not interpret tags or scripts; they will appear as literal characters.

**Example (React)**

```jsx
// Safe: content is always treated as text
function ShowComment({ text }) {
  return <div>{text}</div>;
}
```

**Example (vanilla DOM)**

```javascript
// Safe: textContent does not parse HTML
const el = document.getElementById('output');
el.textContent = userContent;
```

**Comparison with insecure approach**

- **Insecure:** `innerHTML` or `dangerouslySetInnerHTML` with raw content → browser parses HTML and can execute script.
- **Safe:** `textContent` or React `{text}` → content is displayed as text only; no script execution.

**Risk eliminated**

Anything that looks like HTML or JavaScript (e.g. `<script>`, `onerror=`) is shown as text and never runs. This is the preferred option whenever you do not need rich formatting.

---

## 2. When you need HTML: sanitize first

**What to do**

If you must allow some HTML (e.g. bold, links), pass the content through a **sanitization library** that strips or encodes dangerous markup and attributes (e.g. script tags, event handlers). Use a well-maintained library such as **DOMPurify** and allow only a minimal set of tags and attributes.

**Example (conceptual — DOMPurify)**

```javascript
import DOMPurify from 'dompurify';

function sanitize(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
  });
}
```

**Example (React)**

```jsx
// Safe: render only after sanitization
function ShowComment({ text }) {
  const safeHtml = sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
```

**Comparison with insecure approach**

- **Insecure:** Same `dangerouslySetInnerHTML` (or `innerHTML`) but with **unsanitized** content → full XSS risk.
- **Safe:** Same API, but input is **always** sanitized with a strict allowlist → only safe markup remains; script and event handlers are removed.

**Risk eliminated**

Script tags, `onerror`, `onload`, and other executable patterns are stripped or neutralized. The user sees safe formatting (e.g. links, bold) without code execution.

---

## 3. Prefer framework escaping

**What to do**

In React, Vue, etc., binding data into the template (e.g. `{value}`, `{{ value }}`) **escapes** by default. So the default path is “render as text.” Only when you intentionally inject HTML (e.g. with `dangerouslySetInnerHTML`) do you take on the responsibility to sanitize.

**Example**

```jsx
// Safe: default React escaping
function TodoItem({ title }) {
  return <li>{title}</li>;
}
```

**Comparison with insecure approach**

- **Insecure:** Bypassing escaping (e.g. `dangerouslySetInnerHTML` with raw data) disables that protection.
- **Safe:** Staying within normal bindings keeps automatic escaping and avoids XSS from user content.

**Risk eliminated**

As long as you do not inject raw HTML, the framework’s default behavior prevents injected markup from being executed.

---

## 4. Centralize and review “dangerous” APIs

**What to do**

- Use **one** place (e.g. a helper or component) for any “dangerous” API (`innerHTML`, `dangerouslySetInnerHTML`, `eval`, etc.).
- Ensure that **every** call path passes content through sanitization or a strictly controlled source.
- In code review, treat any new use of these APIs as high risk.

**Example (structure only)**

```javascript
// Safe pattern: single function that always sanitizes
export function renderUserHtml(raw) {
  return DOMPurify.sanitize(raw, { ALLOWED_TAGS: [] }); // or allowlist
}
```

**Comparison with insecure approach**

- **Insecure:** Using dangerous APIs in many places with unsanitized data.
- **Safe:** Few, centralized call sites and mandatory sanitization reduce the chance of mistakes.

**Risk eliminated**

You reduce the attack surface and make it easier to enforce “no raw HTML without sanitization.”

---

## Summary

| Approach | When to use | Main point |
|----------|-------------|------------|
| **Plain text** | Default for any user or external content | No HTML → no script execution. |
| **Sanitized HTML** | When you need limited rich text | Sanitize with a library and a strict allowlist; never trust raw input. |
| **Framework defaults** | Always | Avoid bypassing escaping unless necessary, and then always sanitize. |
| **Centralize dangerous APIs** | Project-wide | Fewer places that can introduce XSS; easier to review and maintain. |

---

## How this matches the demo app

- The **insecure** route in the demo uses `dangerouslySetInnerHTML` **without** sanitization → illustrates the risk described in **[insecure-examples.md](./insecure-examples.md)**.
- The **secure** route uses the same UI but **sanitizes** (e.g. with DOMPurify) before rendering → same idea as the “When you need HTML: sanitize first” section above.

For a high-level overview and the “why” behind these practices, see the **[README](./README.md)** in this folder.
