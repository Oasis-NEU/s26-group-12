import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './Pages/LandingPage.tsx'
import ClubViewPage from './Pages/ClubViewPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClubViewPage />
  </StrictMode>,
)
