# XSS Testing — Educational Demo

This repository is a **frontend educational project** to demonstrate **Cross-Site Scripting (XSS)** risks in a controlled, non-malicious way. The goal is to help developers understand why unsafe HTML rendering is dangerous and why sanitization and secure patterns are mandatory.

**What this project demonstrates:**

- **Unsafe HTML rendering** — How rendering user or third-party content as HTML without sanitization allows arbitrary code execution.
- **XSS risks in frontend applications** — How injected code runs in the same context as your app (same origin, access to storage and cookies).
- **Why sanitization and secure patterns are mandatory** — The demo includes both a vulnerable version and a safe version so you can see the difference.

---

## ⚠️ Security Disclaimer

**This repository intentionally contains insecure code for educational purposes only.**

- The vulnerable code and examples are here to teach security awareness and defensive practices.
- **Never use the insecure patterns in production.** Do not copy them into real applications.
- The project is not intended to encourage or enable malicious use. Use it only for learning and training in a controlled environment.

## Goals

- Show why rendering unsanitized HTML is dangerous.
- Show how sanitization and safe patterns prevent XSS.
- Let you compare a vulnerable route and a safe route in the same app.

## How to run

- **Prerequisites:** Node.js 18+ and npm (or yarn/pnpm).
- **Install:** `npm install`
- **Run:** `npm run dev` → app at `http://localhost:5173`

## Documentation

All XSS documentation is in **[docs/xss/](docs/xss/)**:

| Document | Content |
|----------|---------|
| [README](docs/xss/README.md) | What XSS is, how the demo works, index of all docs. |
| [01-actions-without-user-interaction](docs/xss/01-actions-without-user-interaction.md) | Code runs without a click; automatic requests. |
| [02-internal-phishing](docs/xss/02-internal-phishing.md) | Fake UI (e.g. "session expired") inside your app. |
| [03-session-hijacking](docs/xss/03-session-hijacking.md) | Reading tokens from storage; account takeover risk. |
| [insecure-patterns](docs/xss/insecure-patterns.md) | What vulnerable code looks like; how to test in the demo. |
| [safe-patterns](docs/xss/safe-patterns.md) | Plain text, sanitization, and how to prevent XSS. |

Each impact doc (01–03) has: what it demonstrates, why it's dangerous, the injected HTML example, step-by-step flow, and a short takeaway. Educational use only.

## Project structure

```
XSS_testing/
├── docs/xss/           # All XSS docs (overview, 01–03, insecure/safe patterns)
├── docs/security/xss/  # Stub that points to docs/xss
├── src/
│   ├── components/     # InsecureTodoApp, SecureTodoApp
│   ├── utils/          # auth (fake token for demo)
│   ├── App.tsx, main.tsx, index.css
├── package.json, vite.config.ts, tsconfig, etc.
└── README.md
```

## Demo app

- **Local TODO list** — State in memory only (`useState`); no backend.
- **Route `/inseguro`** — Renders TODO text as raw HTML. Vulnerable to XSS. **Do not use in production.**
- **Route `/seguro`** — Same UI; content is sanitized (DOMPurify). Safe pattern.
- **Fake token** — Stored in `localStorage` for demo; see [03-session-hijacking](docs/xss/03-session-hijacking.md).

XSS is dangerous because the browser trusts your application; injected code has the same privileges. Prevention: render user content as plain text or sanitize with a strict allowlist. Details in [docs/xss/](docs/xss/).

## Tech stack

React 18, Vite, TypeScript, React Router, DOMPurify.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Important:** This repository uses branch protection on `main`. All changes must go through Pull Requests. See [.github/BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md) for setup instructions.

## License

Open source for educational use only. The goal is to educate, not to enable misuse.
