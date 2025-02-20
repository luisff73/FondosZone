import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//import App from './App.tsx'
import LoginForm from './users/login-form.tsx'

createRoot(document.getElementById('root')!).render(  // esto renderizara todo el contenido en el div "root" de index html y construira la pagina
  <StrictMode> 
    <BrowserRouter>
    <LoginForm />
    </BrowserRouter>
  </StrictMode>,
)
