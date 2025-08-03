import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TypingProvider } from './context/TypingContext.jsx'

createRoot(document.getElementById('root')).render(
  <TypingProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </TypingProvider>
)
