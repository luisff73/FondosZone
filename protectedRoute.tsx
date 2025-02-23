import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // Obtiene el token
    console.log("Token en protectedRoute: ", token);
    // Función para verificar si el token es válido (aquí puedes mejorar la lógica)
    const isAuthenticated = token && token !== "";

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />; // Si está autenticado, muestra el componente, si no, redirige a /login
};

export default ProtectedRoute;
