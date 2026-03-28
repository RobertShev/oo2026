import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DecathlonProvider } from './context/DecathlonProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DecathlonProvider>
      <App />
    </DecathlonProvider>
  </StrictMode>,
)
