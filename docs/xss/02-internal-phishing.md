# Internal Phishing via XSS

## What this example demonstrates

XSS can change how the page looks. An attacker injects HTML and CSS that looks like part of your app: banners, modals, or fake login forms. Because it appears *inside* your domain, users are more likely to trust it.

This example is a fake “session expired” banner with a “Login” button. In a real attack, that button could send the user to a phishing page or capture credentials. Here it only shows an alert to show that the UI is under the attacker’s control.

## Why this is dangerous in real applications

- The UI looks legitimate: same site, familiar style, plausible message.
- Users trust messages that seem to come from the app they are using.
- Prompts like “Your session expired” or “Verify your account” are commonly used in credential harvesting.
- If users enter credentials into a fake form, the attacker can steal them.

## The vulnerable injected HTML example

If the application renders this string as HTML without sanitization, the following banner will appear at the top of the page:

```html
<div style="
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: #fff3cd;
  color: #664d03;
  border-bottom: 1px solid #ffecb5;
  font-family: Arial, sans-serif;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
">
  <span>⚠️ Your session has expired. Please sign in again.</span>
  <button
    style="
      padding: 8px 12px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    "
    onclick="alert('You would be phished here')"
  >
    Login
  </button>
</div>
```

## What happens step-by-step when it runs

1. The browser parses the injected `<div>` and applies the inline styles.
2. A fixed bar appears at the top, styled like a warning (“session expired”).
3. The “Login” button looks like a normal primary action.
4. When the user clicks it, the `onclick` handler runs—here, an alert; in a real attack, redirect to phishing or credential capture.
5. Because the banner is on your origin, users are more likely to believe it.

## Key takeaway

**XSS can make the page lie.** Injected content can mimic your app. Users trust what they see on your domain. Phishing inside your own application is especially effective. Sanitize or avoid raw HTML so the UI stays under your control.
