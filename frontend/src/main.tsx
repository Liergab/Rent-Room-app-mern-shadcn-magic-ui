import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ReactQueryProvider from './services/provider/ReactQueryProvider.tsx'
import { AppContextProvider } from './context/AppContext.tsx'
import { SearchContextProvider } from './context/SearchContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
    <AppContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchContextProvider>
      </AppContextProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
)
