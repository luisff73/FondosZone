import express, { Request, Response, Router, Express } from "express";
import cors from "cors";
import { authController } from "./controllers/auth.controller";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import { db } from "./db/queries";
import { Profile } from "passport";
import session from "express-session";
import pgSession from "connect-pg-simple"; // Almacén de sesiones en PostgreSQL
import pool from "./config/db.config"; // Importamos la conexión a PostgreSQL

dotenv.config({ path: ".env.local" });

const app: Express = express();
const authRouter: Router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Configurar sesiones con PostgreSQL
const PgSessionStore = pgSession(session);

app.use(
  session({
    store: new PgSessionStore({
      pool, // Usa la misma conexión de PostgreSQL
      tableName: "session", // Nombre de la tabla en la BD que se utilizara para las sesiones
    }),
    secret: process.env.SESSION_SECRET || "tu_secreto_aqui",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Configuración de Passport para Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || "";
        const name = profile.displayName;
        const user = await db.findOrCreateUser(
          name,
          email,
          profile.photos?.[0]?.value || ""
        );
        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

// Configuración de Passport para GitHub

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/api/auth/github/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile, // ✅ Usa `Profile` en lugar de `any`
      done: (error: Error | null, user?: Express.User | false) => void
    ) => {
      try {
        // Asegúrate de que `name` tenga un valor válido (cualquiera que no sea undefined)
        const name = profile.displayName || profile.username || "UsuarioGithub"; // Usa una cadena vacía si displayName o username es undefined
        const email = profile.emails?.[0]?.value ?? profile.username ?? ""; // Usa una cadena vacía si el email es undefined
        const picture = profile.photos?.[0]?.value || ""; // Usa una cadena vacía si la foto es undefined
        // llamamos a la funcion de Buscar o insertar en la BD el usuario
        const user = await db.findOrCreateUser(name, email, picture);

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

// Rutas de autenticación
authRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      await authController.login(req, res);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor " + error });
    }
  }
);

authRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      await authController.register(req, res);
    } catch (error) {
      res.status(500).json({ error: "Error en el registro " + error });
    }
  }
);

authRouter.post(
  "/verificayRegistra", // Asegúrate de que esta ruta esté configurada correctamente
  async (req: Request, res: Response): Promise<void> => {
    try {
      await authController.verificayRegistra(req, res); // Llama a la función verificayRegistra del controlador
    } catch (error) {
      res.status(500).json({
        error: "Error en el proceso de verificación y registro " + error,
      });
    }
  }
);

// Rutas para autenticación con Google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_req, res) => {
    res.redirect("http://localhost:4173/app");
  }
);

// Rutas para autenticación con GitHub
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (_req, res) => {
    res.redirect("http://localhost:4173/app");
  }
);

// Montar el router en /api/auth
app.use("/api/auth", authRouter);

// Iniciar servidor
const PORT: number = Number(process.env.PORT); // || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(
  (
    user: Express.User,
    done: (err: unknown, user: Express.User | false | null) => void
  ) => {
    done(null, user);
  }
);

export default app;
