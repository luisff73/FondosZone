// auth.controller.ts:

// Contiene la lógica de negocio
// Maneja la autenticación
// Interactúa con la base de datos
// Procesa los datos y devuelve respuestas

import { Request, Response } from "express";
import { db } from "../db/queries";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // console.log("Intento de login:", { email, password }); // Log para debugging

      const result = await db.getUserByEmail(email);
      console.log("Usuario encontrado:", result.rows[0]);

      if (!result.rows || result.rows.length === 0) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const user = result.rows[0];
      //console.log("Contraseña almacenada:", user.password); // hash en la BD

      if (!user.password) {
        return res.status(500).json({ error: "Error en datos de usuario" });
      }
      // aqui es donde se compara la contraseña
      const validPassword = await bcrypt.compare(password, user.password);

      console.log("¿Contraseña válida?:", validPassword);

      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "12h" }
      );

      return res.json({
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type,
        },
      });
    } catch (error) {
      console.error("Error en login:", error); // Log del error
      return res.status(500).json({ error: "Error en el servidor" + error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, type } = req.body;
      const result = await db.createUser(name, email, password, type);
      console.log(
        "Respuesta del servidor registrando al usuario en auth.controller.ts:",
        result
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Error en el registro" + error });
    }
  }
}

export const authController = new AuthController();
