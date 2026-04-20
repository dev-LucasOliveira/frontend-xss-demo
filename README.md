# XSS Testing — Educational Demo

This repository is a **frontend educational project** to demonstrate **Cross-Site Scripting (XSS)** risks in a controlled, non-malicious way. The goal is to help developers understand why unsafe HTML rendering is dangerous and why sanitization and secure patterns are mandatory. The demo UI uses the same **dark-theme tokens and typography (Inter)** as [portfolio-web](https://github.com/dev-LucasOliveira/portfolio-web) (`packages/ui` theme), without adding MUI to this Vite app.

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

The sticky top bar links to the portfolio site (same structure as portfolio-web’s navbar). Optional env: `VITE_PORTFOLIO_ORIGIN` (default `https://lucascoliveira.com`, no trailing slash) and `VITE_PORTFOLIO_LOCALE` (default `en`). Set them when you want preview builds to open a different portfolio host or locale.

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
├── public/             # icon.svg (+ site.webmanifest) — same favicon asset as portfolio-web apps/web/public
├── docs/xss/           # All XSS docs (overview, 01–03, insecure/safe patterns)
├── docs/security/xss/  # Stub that points to docs/xss
├── src/
│   ├── components/     # InsecureTodoApp, SecureTodoApp
│   ├── constants/      # Route paths
│   ├── utils/          # auth (fake token for demo)
│   ├── App.tsx, main.tsx, index.css
├── package.json, vite.config.ts, tsconfig, etc.
└── README.md
```

## Demo app

- **Local todo list** — State in memory only (`useState`); no backend.
- **Route `/insecure`** — Renders todo text as raw HTML. Vulnerable to XSS. **Do not use in production.**
- **Route `/secure`** — Same UI; content is sanitized (DOMPurify). Safe pattern.
- **Legacy routes** — `/inseguro` and `/seguro` redirect to `/insecure` and `/secure`.
- **Fake token** — Stored in `localStorage` for demo; see [03-session-hijacking](docs/xss/03-session-hijacking.md).

XSS is dangerous because the browser trusts your application; injected code has the same privileges. Prevention: render user content as plain text or sanitize with a strict allowlist. Details in [docs/xss/](docs/xss/).

## Tech stack

React 18, Vite, TypeScript, React Router, DOMPurify.

## Branding (favicon)

The **[portfolio-web](https://github.com/dev-LucasOliveira/portfolio-web)** app’s `public` folder only exposes **`icon.svg`** for the mark (see e.g. [`apps/web/public/icon.svg`](https://github.com/dev-LucasOliveira/portfolio-web/blob/main/apps/web/public/icon.svg)). This project uses the **same SVG** and a single `<link rel="icon" href="./icon.svg" type="image/svg+xml" />` in `index.html`—no extra PNGs in `public` like we had added before.

Next.js may still declare **`/opengraph-image.png`** / **`/twitter-image.png`** in `layout.tsx` metadata; those are **not** shipped in `public/` in the tree we mirrored—often generated elsewhere. Here, Open Graph / Twitter tags are **title + description only** (`twitter:card` is `summary` without an image URL).

## Deployment

- **Vercel / Netlify / root domain:** Run `npm run build` with the default settings. Production assets use base path `/` so scripts load from `/assets/...`.
- **GitHub Pages** (`https://<user>.github.io/<repo>/`): The GitHub Actions workflow sets `VITE_BASE_PATH=/<repo>/` so URLs match the subpath. To build locally for Pages:  
  `VITE_BASE_PATH=/your-repo-name/ npm run build`

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Important:** This repository uses branch protection on `main`. All changes must go through Pull Requests. See [.github/BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md) for setup instructions.

## License

Open source for educational use only. The goal is to educate, not to enable misuse.
