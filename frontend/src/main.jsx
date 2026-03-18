import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = '346364338725-k95632i70pv0g42omhtkfshjeo2r7ijf.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageProvider>
      <AppContextProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </AppContextProvider>
    </LanguageProvider>
  </BrowserRouter>
)
