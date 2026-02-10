# Safe Patterns — How to Prevent XSS

> Use these patterns in real applications. They prevent XSS when applied consistently.

---

## 1. Render as plain text (default)

Treat user and third-party content as **data**, not HTML. The browser will not execute any tags or scripts.

- **React:** `{text}` (default escaping).
- **Vanilla:** `element.textContent = userContent`.

**Effect:** Content like `<script>` or `onerror=` is shown as text and never runs. Prefer this whenever you don’t need rich formatting.

---

## 2. When you need HTML: sanitize first

If you must allow some HTML (e.g. bold, links), run it through a **sanitization library** (e.g. DOMPurify) with a **strict allowlist** of tags and attributes. Never trust raw input.

**Example (conceptual):**

```javascript
import DOMPurify from 'dompurify';

const safeHtml = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
  ALLOWED_ATTR: ['href', 'title'],
});
```

Then use `safeHtml` in `dangerouslySetInnerHTML` (or equivalent). Script tags and event handlers are removed.

**In the demo:** The secure route (`/seguro`) uses this approach so the same input that runs on `/inseguro` is safe on `/seguro`.

---

## 3. Rely on framework defaults

In React, Vue, etc., normal bindings escape by default. Only when you **explicitly** inject HTML (e.g. `dangerouslySetInnerHTML`) do you need to sanitize. Prefer normal bindings so the framework keeps protecting you.

---

## Key takeaway

- **Default:** Render user content as plain text.
- **If you need HTML:** Sanitize with a library and a strict allowlist; never render raw user input as HTML.

For the risky patterns these replace, see [insecure-patterns.md](./insecure-patterns.md).
