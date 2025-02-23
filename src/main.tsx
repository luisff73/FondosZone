import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProviderWrapper from '../authProvider';
import AppRoutes from '../AppRoutes';  // Asegúrate de importar AppRoutes en lugar de App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <AppRoutes />  {/* Aquí se debe usar AppRoutes para proteger todas las rutas*/}
      </AuthProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);

