
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <LanguageProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </LanguageProvider>
  </HashRouter>
)
