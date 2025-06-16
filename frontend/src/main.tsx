import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './providers/UserProvider.tsx'
import { SongProvider } from './providers/SongProvider.tsx'
import { AdminProvider } from './providers/AdminProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SongProvider>
      <AdminProvider>
        <UserProvider>
            <App />
        </UserProvider>
      </AdminProvider>
    </SongProvider>
  </StrictMode>,
)
