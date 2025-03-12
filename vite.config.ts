import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite todas las interfaces de red
    port: 4173, // O el puerto que desees usar
    cors: true, // Habilita CORS para solicitudes externas
  },
});
