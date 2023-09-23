import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from 'react-use-cart'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
         <App />
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
