import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSymbolIcon, KeyIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/button';
import FondosZoneLogo from '../components/fondos-zone';
import { registerUser } from '../../auth';
import { AxiosError } from 'axios';

export default function RegisterForm() {
    const navigate = useNavigate();
    //const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica de registro aquí
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const userData = await registerUser(name, email, password, "user");
            console.log('Usuario registrado:', userData);

            // Redirigir al login después del registro exitoso
            navigate('/login');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data?.error || 'Error en el registro');
            }
        } finally {
            setIsPending(false);
        }
    };
    return (
        <form className="flex items-center justify-center min-h-screen mt-4 lg:mt-8" onSubmit={handleSubmit}>
            <div className="body relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
                <div className="flex h-34 h-auto w-full items-center justify-center rounded-lg bg-color-400 p-3">
                    <div className="h-full w-full text-white flex justify-center">
                        <FondosZoneLogo />
                    </div>
                </div>

                <h1 className="text-xl font-bold dark:text-white">Registro</h1>
                <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-lg">
                    <div>
                        <label className="mb-3 mt-1 block text-xs font-medium text-gray-900" htmlFor="name">
                            Nombre
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Tu nombre"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                <Button className="mt-4 w-full" aria-disabled={isPending}>
                    Registrarse
                </Button>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">¿Ya tienes cuenta?</span>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="ml-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Inicia sesión
                    </button>
                </div>
            </div>
        </form>
    );
}
