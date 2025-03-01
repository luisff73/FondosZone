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

  async getUserByEmailSocialLogin(email: string): Promise<User | null> {
    const query = `
      SELECT * FROM users
      WHERE email = $1
    `;
    const result = await this.pool.query<User>(query, [email]);
    return result.rows.length ? result.rows[0] : null; // Devuelve el primer usuario o null
  }

  async findOrCreateUser(
    name: string,
    email: string,
    profile_picture_url: string
  ): Promise<User> {
    let user = await this.getUserByEmailSocialLogin(email);
    if (!user) {
      const query = `
        INSERT INTO users (name, email, password, type, profile_picture_url)
        VALUES ($1, $2, 'Social_login', 'social', $3)
        RETURNING *
      `;
      const result = await this.pool.query<User>(query, [
        name,
        email,
        profile_picture_url,
      ]);
      user = result.rows[0];
    }
    return user;
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
