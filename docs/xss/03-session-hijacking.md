# Session Hijacking via XSS

## What this example demonstrates

When an attacker runs JavaScript in your page, that code runs in the **same origin** as your application. The browser does not distinguish “your” script from “their” script. Injected code can read what your frontend can read: cookies, `localStorage`, `sessionStorage`, tokens.

This example reads a token from `localStorage` and uses it in a request; the response is shown on the page. In a real attack, the token or response could be sent to the attacker’s server, leading to account takeover.

## Why this is dangerous in real applications

- Tokens in `localStorage` (or cookies without `HttpOnly`) are readable by any script on the page.
- The browser gives injected script the same privileges as your code.
- With a valid session token, an attacker can impersonate the user: call APIs, change data, export information.
- XSS is often the first step in account takeover because it exposes session data.

## The vulnerable injected HTML example

If the application renders this string as HTML without sanitization, the following will run when the image fails to load:

```html
<img src="x" onerror="
  fetch('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token')
    }
  })
  .then(r => r.json())
  .then(data => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<pre style=position:fixed;bottom:20px;right:20px;background:#222;color:#0f0;padding:16px;z-index:9999>'
      + JSON.stringify(data, null, 2) +
      '</pre>'
    );
  })
">
```

## What happens step-by-step when it runs

1. The `<img src="x">` fails to load; the `onerror` handler runs automatically.
2. The script reads `localStorage.getItem('auth_token')`—the same token your app might use.
3. It sends a request with `Authorization: Bearer <token>`.
4. The response is shown in a `<pre>` on the page. In a real attack, it could be sent to the attacker’s server.
5. The user may only see an extra panel; their session can still be compromised.

## Key takeaway

**The browser trusts the application.** Any script on your page can access the same tokens and storage as your code. XSS gives the attacker that access and often leads to session hijacking and account takeover. Preventing script injection (sanitization and safe rendering) is mandatory for any app that uses authentication.
