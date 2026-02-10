import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { initializeAuthToken } from './utils/auth'
import './index.css'

// Token falso para demonstração educacional (ex.: alert no XSS)
initializeAuthToken()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
