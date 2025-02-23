
// Este archivo es fundamental para:

// Gestionar la autenticación en toda la aplicación
// Mantener las sesiones de usuario
// Proporcionar un contexto de autenticación a todos los componentes hijos
// Manejar cookies de forma segura
//¡Es una pieza clave para el sistema de autenticación de la aplicación!

import React from 'react';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const AuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Crea un almacén de autenticación con las opciones predeterminadas
    const store = createStore({
        authName: '_auth', // Nombre de la cookie como auth
        authType: 'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:'
    });

    // Envuelve los componentes hijos con el AuthProvider

    return (
        <AuthProvider store={store}>
            {children}
        </AuthProvider>
    );
};

export default AuthProviderWrapper;
