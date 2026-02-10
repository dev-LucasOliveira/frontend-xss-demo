# Actions Executed Without User Interaction

## What this example demonstrates

**The victim does not need to click anything.** As soon as the malicious HTML is rendered, the script runs automatically. Injected code runs with the same privileges as your application.

This example shows how an attacker can trigger network requests and change the page without any user action. In a real scenario, the same pattern could call internal APIs or perform actions in the user's name—all without a single click.

## Why this is dangerous in real applications

- Users expect nothing to happen until they interact. XSS breaks that assumption.
- Any authenticated request your app can make, injected code can make too (same cookies, tokens, origin).
- Automatic execution is hard to notice and scales to every visitor.

## The vulnerable injected HTML example

If the application renders this string as HTML (e.g. via `innerHTML` or `dangerouslySetInnerHTML` without sanitization), the following will run as soon as the element is inserted:

```html
<img src=x onerror="
  fetch('https://dummyjson.com/todos/1')
    .then(r => r.json())
    .then(d => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<pre style=position:fixed;bottom:16px;right:16px;background:#111;color:#0f0;padding:16px;z-index:9999>'
        + JSON.stringify(d, null, 2) +
        '</pre>'
      )
    })
">
```

## What happens step-by-step when it runs

1. The browser parses the `<img>` tag. `src=x` is invalid, so the image fails to load.
2. The `onerror` handler runs **automatically**—no user click.
3. The script calls `fetch('https://dummyjson.com/todos/1')` and receives JSON.
4. It injects a `<pre>` at the bottom-right of the page with that data.
5. In a real attack, the same mechanism could call your APIs, submit forms, or exfiltrate data.

## Key takeaway

**No click is required.** Code runs as soon as it is rendered. Any action your app can perform can be triggered automatically by injected code. Unsafe HTML rendering must never be used in production.
