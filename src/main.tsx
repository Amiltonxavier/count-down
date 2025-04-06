import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ProviderApp } from './providers'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderApp />
  </StrictMode>,
)
