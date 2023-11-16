import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-527lnr3jor0ghkke.us.auth0.com"
      clientId="DKzTK1plmlBRXftGEbg3sutLYOyT1nwL"
      redirectUri={'http://localhost:5173/admin'}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
