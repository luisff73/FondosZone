//import { Pool, PoolConfig, QueryResult } from 'pg';

import { Pool, PoolConfig } from "pg";

import dotenv from "dotenv"; // Importar el módulo dotenv para leer variables de entorno

dotenv.config();

// Configuración de la base de datos
const dbConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL || "",
  ssl: { rejectUnauthorized: false },
  max: 5, // Limita las conexiones simultáneas
  idleTimeoutMillis: 60000, // Cierra conexiones inactivas después de 60s
  connectionTimeoutMillis: 5000, // Tiempo máximo de espera al conectar
};

const pool = new Pool(dbConfig);
console.log("Conectando a Neon PostgreSQL...");

pool.connect((err) => {
  if (err) {
    console.error("Error conectando a Neon PostgreSQL:", err.stack);
  } else {
    console.log("Conectado exitosamente a Neon PostgreSQL");
  }
});

export default pool;
