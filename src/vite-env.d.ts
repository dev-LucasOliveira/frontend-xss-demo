/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** e.g. https://lucascoliveira.com — base URL for portfolio nav links */
  readonly VITE_PORTFOLIO_ORIGIN?: string
  /** Locale segment in portfolio URLs (default: en) */
  readonly VITE_PORTFOLIO_LOCALE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
