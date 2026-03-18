import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1029870889673-pd8e3n7iq20gnrke115hg5rk90ioghfl.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <LanguageProvider>
      <AppContextProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </AppContextProvider>
    </LanguageProvider>
  </HashRouter>
)
