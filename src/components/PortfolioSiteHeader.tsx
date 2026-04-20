import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import {
  CONTACT_LINKS,
  PORTFOLIO_HOME_URL,
  PORTFOLIO_NAV_LINKS,
  SITE_BRAND,
  portfolioPageUrl,
} from "../constants/portfolioNav";
import "./PortfolioSiteHeader.css";

const iconUrl = `${import.meta.env.BASE_URL}icon.svg`;

type SocialIconProps = {
  /** Pixel size (maps to SVG width/height; default 20). */
  fontSize?: number;
  /** 0–1, applied to the root SVG. */
  opacity?: number;
  className?: string;
};

function LinkedInIcon({
  fontSize = 15,
  opacity = 0.85,
  className = "portfolio-header__social-icon",
}: SocialIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      width={fontSize}
      height={fontSize}
      opacity={opacity}
    >
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function GitHubIcon({
  className = "portfolio-header__social-icon",
}: SocialIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      width={18.46}
      opacity={0.8}
    >
      <path
        fill="currentColor"
        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden>
      <path
        fill="currentColor"
        d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
      />
    </svg>
  );
}

export default function PortfolioSiteHeader() {
  /** Overlay in DOM (for exit animation). */
  const [overlayMounted, setOverlayMounted] = useState(false);
  /** Slide / fade “open” visual state. */
  const [overlayOpen, setOverlayOpen] = useState(false);
  const titleId = useId();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const openMenu = useCallback(() => {
    setOverlayMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayOpen(true));
    });
  }, []);

  const closeMenu = useCallback(() => {
    setOverlayOpen(false);
  }, []);

  const finishClose = useCallback(() => {
    setOverlayMounted(false);
    menuButtonRef.current?.focus();
  }, []);

  const onDrawerTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (!overlayOpen) {
        finishClose();
      }
    },
    [overlayOpen, finishClose],
  );

  useEffect(() => {
    if (!overlayMounted || !overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayMounted, overlayOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = overlayMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayMounted]);

  return (
    <header className="portfolio-header">
      <div className="portfolio-header__inner">
        <div className="portfolio-header__left">
          <a
            className="portfolio-header__logo-link"
            href={PORTFOLIO_HOME_URL}
            aria-label={SITE_BRAND}
          >
            <img src={iconUrl} alt="" width={28} height={28} />
          </a>
          <a className="portfolio-header__brand" href={PORTFOLIO_HOME_URL}>
            {SITE_BRAND}
          </a>
          <div className="portfolio-header__social">
            <a
              className="portfolio-header__icon-btn"
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
            <a
              className="portfolio-header__icon-btn"
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>

        <nav className="portfolio-header__nav-desktop" aria-label="Portfolio">
          {PORTFOLIO_NAV_LINKS.map((item) => (
            <a
              key={item.path || "home"}
              className="portfolio-header__nav-link"
              href={portfolioPageUrl(item.path)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="portfolio-header__menu-btn"
          aria-label="Open menu"
          aria-expanded={overlayOpen}
          aria-controls={menuId}
          onClick={openMenu}
        >
          <MenuIcon />
        </button>
      </div>

      {overlayMounted ? (
        <>
          <button
            type="button"
            className={
              overlayOpen
                ? "portfolio-header__backdrop portfolio-header__backdrop--open"
                : "portfolio-header__backdrop"
            }
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            id={menuId}
            className={
              overlayOpen
                ? "portfolio-header__drawer portfolio-header__drawer--open"
                : "portfolio-header__drawer"
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onTransitionEnd={onDrawerTransitionEnd}
          >
            <div className="portfolio-header__drawer-head">
              <span id={titleId} className="portfolio-header__drawer-title">
                Menu
              </span>
              <button
                type="button"
                className="portfolio-header__icon-btn"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <MenuIcon />
              </button>
            </div>
            <ul className="portfolio-header__drawer-list">
              {PORTFOLIO_NAV_LINKS.map((item) => (
                <li key={item.path || "home"}>
                  <a
                    className="portfolio-header__drawer-link"
                    href={portfolioPageUrl(item.path)}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}
