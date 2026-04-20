import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import InsecureTodoApp from "./components/InsecureTodoApp";
import PortfolioSiteHeader from "./components/PortfolioSiteHeader";
import SecureTodoApp from "./components/SecureTodoApp";
import { ROUTES } from "./constants/routes";
import { DEMO_SOURCE_REPO_URL } from "./constants/sourceRepo";
import "./App.css";

function Navigation() {
  const location = useLocation();
  const path = location.pathname;
  const isInsecure =
    path === "/" || path === ROUTES.INSECURE || path === ROUTES.LEGACY_INSECURE;

  return (
    <nav className="navigation">
      <Link to={ROUTES.INSECURE} className={isInsecure ? "active" : ""}>
        Insecure version
      </Link>
      <Link
        to={ROUTES.SECURE}
        className={
          path === ROUTES.SECURE || path === ROUTES.LEGACY_SECURE
            ? "active"
            : ""
        }
      >
        Secure version
      </Link>
    </nav>
  );
}

/** HashRouter in production avoids 404s on GitHub Pages; BrowserRouter locally. */
function AppContent() {
  return (
    <div className="app">
      <PortfolioSiteHeader />
      <div className="app-body">
        <header className="app-header">
          <p className="app-header__source">
            <a
              href={DEMO_SOURCE_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
            </a>
            <span className="app-header__source-hint">
              {" "}
              — educational demo, open source
            </span>
          </p>
          <h1>XSS testing — educational demo</h1>
          <p className="subtitle">
            This project demonstrates XSS risks in a controlled, educational way
          </p>
        </header>
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<InsecureTodoApp />} />
            <Route path={ROUTES.INSECURE} element={<InsecureTodoApp />} />
            <Route path={ROUTES.SECURE} element={<SecureTodoApp />} />
            <Route
              path={ROUTES.LEGACY_INSECURE}
              element={<Navigate to={ROUTES.INSECURE} replace />}
            />
            <Route
              path={ROUTES.LEGACY_SECURE}
              element={<Navigate to={ROUTES.SECURE} replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  if (import.meta.env.PROD) {
    return (
      <HashRouter>
        <AppContent />
      </HashRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
