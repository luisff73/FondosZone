import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./src/users/login";
import RegisterForm from "./src/users/register-form";
import App from "./src/App";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* 🔒 Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app/*" element={<App />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
