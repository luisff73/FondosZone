import axios, { AxiosError } from "axios";
import bcrypt from "bcryptjs";
// Configura la URL base para todas las peticiones
axios.defaults.baseURL = "http://localhost:3000";

// Recibe email y contraseña del usuario
// Hace una petición POST a '/api/auth/login'
// Compara la contraseña usando bcrypt para verificar que coincide

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post("/api/auth/login", { email, password });
    console.log("Respuesta del servidor:", response.data);
    return response.data; // El servidor ya validó las credenciales
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log("Error en login:", error.response.data);
      throw new Error("Failed to login: " + error.response.data.error);
    } else {
      console.log("Error desconocido en loginUser:", error);
      throw new Error("Failed to login: Unknown error");
    }
  }
}

// Recibe nombre, email y contraseña del nuevo usuario
// Encripta la contraseña usando bcrypt con 10 rondas de salt
// Hace una petición POST a '/api/auth/register' con los datos
// Envía la contraseña ya hasheada por seguridad
// Devuelve los datos del usuario registrado

export async function registerUser(
  name: string,
  email: string,
  password: string,
  type: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password: hashedPassword,
      type,
    });
    console.log("Respuesta del servidor registrando al usuario en auth.ts:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to register" + error);
  }
}
