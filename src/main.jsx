import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './providers/AuthProvider.jsx'
import { UsersProvider } from './providers/UsersProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
      <App />
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>,
)
