import { Pool, QueryResult } from "pg";
import pool from "../config/db.config";
import { User, Fondo } from "../../definitions";

// Clase para manejar las consultas
export class DatabaseQueries {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  // Consultas de usuarios
  async createUser(
    name: string,
    email: string,
    password: string,
    type: string
  ): Promise<QueryResult<User>> {
    const query = `
      INSERT INTO users (name, email, password, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    return this.pool.query<User>(query, [name, email, password, type]);
  }

  async getUserByEmail(email: string): Promise<QueryResult<User>> {
    const query = `
      SELECT * FROM users
      WHERE email = $1
    `;
    return this.pool.query<User>(query, [email]);
  }

  // Consultas de fondos
  async getFondos(): Promise<QueryResult<Fondo>> {
    const query = `
      SELECT * FROM fondos
      ORDER BY fecha DESC
    `;
    return this.pool.query<Fondo>(query);
  }

  async getFondoById(id: number): Promise<QueryResult<Fondo>> {
    const query = `
      SELECT * FROM fondos
      WHERE id = $1
    `;
    return this.pool.query<Fondo>(query, [id]);
  }
}

export const db = new DatabaseQueries();
