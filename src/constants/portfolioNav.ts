/**
 * Portfolio site URLs — aligned with portfolio-web routing (`/{locale}/...`).
 * Social links match apps/web/lib/contact-links.ts.
 */

export const SITE_BRAND = 'Lucas Oliveira'

export const CONTACT_LINKS = {
  linkedin: 'https://www.linkedin.com/in/oliveira-lucas-c/',
  github: 'https://github.com/dev-LucasOliveira',
} as const

function normalizeOrigin(raw: string): string {
  return raw.replace(/\/+$/, '')
}

export const PORTFOLIO_ORIGIN = normalizeOrigin(
  import.meta.env.VITE_PORTFOLIO_ORIGIN ?? 'https://lucascoliveira.com',
)

/** Absolute URL to a portfolio page (locale prefix included). */
export function portfolioPageUrl(pathSegment: string): string {
  const base = `${PORTFOLIO_ORIGIN}/`.replace(/\/+$/, '')
  const seg = pathSegment.replace(/^\//, '')
  if (!seg) return base
  return `${base}/${seg}`
}

export const PORTFOLIO_HOME_URL = portfolioPageUrl('')

export const PORTFOLIO_NAV_LINKS = [
  { path: '', label: 'Home' },
  { path: 'about', label: 'About' },
  { path: 'experience', label: 'Experience' },
  { path: 'projects', label: 'Projects' },
  { path: 'blog', label: 'Blog' },
  { path: 'ai', label: 'AI' },
] as const
