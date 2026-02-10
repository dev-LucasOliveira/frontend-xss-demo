import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import InsecureTodoApp from './components/InsecureTodoApp'
import SecureTodoApp from './components/SecureTodoApp'
import './App.css'

function Navigation() {
  const location = useLocation();
  const isInsecure = location.pathname === '/' || location.pathname === '/inseguro';
  
  return (
    <nav className="navigation">
      <Link 
        to="/inseguro" 
        className={isInsecure ? 'active' : ''}
      >
        Versão Insegura
      </Link>
      <Link 
        to="/seguro" 
        className={location.pathname === '/seguro' ? 'active' : ''}
      >
        Versão Segura
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>XSS Testing - Demonstração Educacional</h1>
          <p className="subtitle">
            Este projeto demonstra riscos de XSS de forma controlada e educacional
          </p>
        </header>
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<InsecureTodoApp />} />
            <Route path="/inseguro" element={<InsecureTodoApp />} />
            <Route path="/seguro" element={<SecureTodoApp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
