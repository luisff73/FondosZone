//import { Pool, PoolConfig, QueryResult } from 'pg';
import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv"; // Importar el módulo dotenv para leer variables de entorno

dotenv.config();

interface DatabaseConfig {
  connectionString: string;
  ssl: {
    rejectUnauthorized: boolean;
  };
}

const dbConfig: DatabaseConfig = {
  connectionString: process.env.DATABASE_URL!, // URL de la base de datos del fichero .env
  ssl: {
    rejectUnauthorized: false,
  },
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
