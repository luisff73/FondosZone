import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
});
