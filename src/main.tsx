import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { initializeAuthToken } from './utils/auth'
import './index.css'

// Fake token for educational demos (e.g. XSS + localStorage)
initializeAuthToken()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
