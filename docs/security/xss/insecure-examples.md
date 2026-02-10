# Insecure Examples — For Educational Reference Only

---

> **⚠️ Do not use in production**  
> Every example in this file is **intentionally insecure**. It exists only to illustrate *what not to do* and *what risk looks like*. Copying these patterns into real code would create vulnerabilities.

---

This document shows **simplified, non-malicious** code patterns that demonstrate why certain frontend practices are dangerous. Each example focuses on the **risk** (e.g. script execution, access to browser data), not on how to exploit it. No real attack payloads, exfiltration, or suspicious external calls are included.

For safe alternatives, see **[safe-examples.md](./safe-examples.md)**.

---

## 1. Rendering raw HTML from user input

**What it looks like**

Content coming from the user (or from an API that reflects user data) is inserted into the DOM as HTML without validation or sanitization.

```html
<!-- Conceptual: a component that renders "userContent" as HTML -->
<div id="output"></div>
<script>
  const userContent = getSomeUserInput(); // e.g. from a form or URL
  document.getElementById('output').innerHTML = userContent;
</script>
```

In a React-style context, the same idea is often expressed as:

```jsx
// Conceptual — do not use
function ShowComment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}
```

**Risk**

Whatever the user (or an attacker) supplies is treated as HTML. If that string contains `<script>`, `<img onerror="...">`, or other executable markup, the browser will run it in the page context. There is no separation between “data” and “code,” so the application effectively allows arbitrary script execution.

---

## 2. Script running in the page context

**What it looks like**

If the “user input” in the previous example were a string that represents a script tag (shown here only as a *description* of behavior, not a real payload), the browser would execute it. For education, we only illustrate the *effect* in a controlled way.

Example of **effect** in a test environment (e.g. console or a local demo):

```javascript
// Simulated effect: a script in the page could do something like:
// - Read from the same origin
const token = localStorage.getItem('auth_token');
console.log('Token (simulated read):', token ? 'present' : 'absent');

// - Or trigger a simulated “action” (e.g. log, not send anywhere)
console.warn('Simulated: action could run in user context');
```

**Risk**

Script that runs in the page has the same privileges as the app: same-origin storage (e.g. `localStorage`, sessionStorage), cookies, and the ability to change the DOM or make requests as the user. So any unsanitized HTML that can execute script is a critical vulnerability.

---

## 3. Access to browser-stored data (e.g. fake token)

**What it looks like**

In our demo, a **fake** token might be stored in `localStorage` for educational purposes. In a real app, tokens or other sensitive data are often stored there. The following snippet does **not** exfiltrate anything; it only shows that script in the page *can* read same-origin storage.

```javascript
// Conceptual — demonstrates that in-page script can read localStorage.
// This is NOT a payload; it is a minimal illustration of capability.
function demonstrateStorageAccess() {
  const key = 'auth_token';
  const value = localStorage.getItem(key);
  return value !== null; // true if something is stored
}
```

**Risk**

If an attacker can run script via XSS, they can use the same APIs (e.g. `localStorage.getItem`) to read tokens or other sensitive data. The defense is to prevent script injection (sanitization / safe rendering), not to “hide” the token from script.

---

## 4. Simulated automatic action in user context

**What it looks like**

Again, we do not show a real attack. We only show that script running in the page could, in principle, perform actions as the user (e.g. call an API, change UI). Here it is limited to a harmless log.

```javascript
// Simulated “action” — no network call, no real side effect.
// Real XSS could abuse similar APIs to act on behalf of the user.
function simulatedUserAction() {
  console.info('Simulated: code running in user context could call APIs or change UI');
}
```

**Risk**

Any script injected via XSS runs as the user. So it could trigger requests, submit forms, or change content. The way to prevent this is to ensure that user- or third-party-controlled data is never interpreted as executable code (see **[safe-examples.md](./safe-examples.md)**).

---

## Summary

| Example | Main takeaway |
|--------|----------------|
| 1. Raw HTML | Rendering unsanitized HTML allows arbitrary script execution. |
| 2. Script in context | In-page script has full same-origin privileges. |
| 3. Storage access | Script can read (and write) same-origin storage; XSS makes that accessible to an attacker. |
| 4. User-context actions | Injected script can act as the user (requests, UI changes). |

None of these examples are safe to reuse in production. They are here only to clarify **what risk looks like** so that you can avoid it with the patterns described in **[safe-examples.md](./safe-examples.md)**.
