import { useState } from "react";
import { loginUser } from "../../auth";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../components/button";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const signIn = useSignIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null); // Limpiar error previo
    setEmailError(""); // Limpiar el error de email
    setPasswordError(""); // Limpiar el error de contraseña

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userData = await loginUser(email, password);
      console.log("Datos del usuario: ", userData);

      signIn({
        auth: { token: userData.token },
        userState: {
          name: userData.user.name,
          uid: userData.user.id,
          email: userData.user.email,
          type: userData.user.type,
        },
      });
      localStorage.setItem("token", userData.token); // Guarda el token en localStorage
      window.location.href = "/app"; // Redirigir al dashboard
    } catch (error: unknown) {
      //console.error("Entra en el catch ", error);
      if (error instanceof Error) {
        // Verifica si el mensaje del error es específico de la autenticación
        const errorMessage = error.message;
        if (errorMessage === "Failed to login: Usuario no encontrado") {
          setEmailError("Email no registrado");
        } else if (errorMessage === "Failed to login: Contraseña incorrecta") {
          setPasswordError("Contraseña inválida");
        } else {
          setErrorMessage("Credenciales incorrectas.");
        }
      } else {
        setErrorMessage("Error inesperado en la autenticación.");
      }
    } finally {
      setIsPending(false);
    }
  };


  // Handlers para los botones de Social Login
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  const handleGitHubLogin = () => {
    console.log("Inicio de sesión con GitHub");
    window.location.href = 'http://localhost:3000/api/auth/github';
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
        <h1 className="text-xl font-bold dark:text-white">Iniciar sesión</h1>
        <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-lg">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${emailError ? 'border-red-500' : 'border-gray-200'}`}
                id="email"
                type="email"
                name="email"
                placeholder="Introduzca su correo electrónico"
                required
              />

              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

              <div>
                {emailError && (
                  <p className="text-red-500 text-sm mt-1 ml-10">{emailError}</p>
                )}
              </div>

            </div>
          </div>

          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${passwordError ? 'border-red-500' : 'border-gray-200'}`}
                id="password"
                type="password"
                name="password"
                placeholder="Introduzca su contraseña"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div className="flex h-4 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-600">¿No tienes cuenta?</span>
          <button
            type="button"
            onClick={() => window.location.href = '/register'}
            className="ml-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Regístrate aquí
          </button>
        </div>

        {/* Botones de Social Login */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
            Login in con Google
          </button>
          <button
            type="button"
            onClick={handleGitHubLogin}
            className="flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
          >
            <FaGithub className="mr-2 h-5 w-5" />
            Login con GitHub
          </button>
        </div>
      </div>
    </form>
  );
}
