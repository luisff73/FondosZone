import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSymbolIcon, KeyIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/button';
import FondosZoneLogo from '../components/fondos-zone';
import { registerUser } from '../../auth';
import axios, { AxiosError } from 'axios';

export default function RegisterForm() {
    const navigate = useNavigate(); 
    const [isPending, setIsPending] = useState(false);
    const [isVerificationModalVisible, setIsVerificationModalVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        type: 'user'
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const form = new FormData(e.currentTarget);
        const newFormData = {
            name: form.get('name') as string,
            email: form.get('email') as string,
            password: form.get('password') as string,
            type: 'user'
        };
        setFormData(newFormData);

        try {
            // Primero, registramos al usuario y luego mostramos el modal de verificación
            const userData = await registerUser(newFormData.name, newFormData.email, newFormData.password, "user");
            console.log('Usuario registrado:', userData);

            // Mostrar el modal para ingresar el código
            setIsVerificationModalVisible(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data?.error || 'Error en el registro');
            }
        } finally {
            setIsPending(false);
        }
    };

    const handleVerificationSubmit = async () => {
        try {
            const isCodeCorrect = await verifyCode();
            if (isCodeCorrect) {
                setIsVerified(true);
                setIsVerificationModalVisible(false);
                navigate('/login');  // Redirige al login si es correcto
            } else {
                alert('Código incorrecto');
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
        }
    };



    // Función para verificar el código en el cliente
    const verifyCode = async () => {


        try {
            // Depuración: log para ver el código que estamos enviando
            console.log("Enviando código de verificación:", verificationCode);

            // Enviar código de verificación y los datos necesarios al servidor
            const response = await axios.post('/api/auth/verificayRegistra', {
                ...formData,
                code: verificationCode
            });

            // Depuración: log para ver la respuesta completa del servidor
            console.log("Respuesta del servidor:", response);

            // Si la respuesta es exitosa, el usuario se registra correctamente
            if (response.status === 201) {
                console.log("Código verificado correctamente");  // Agregar log de éxito
                setIsVerified(true);
                setIsVerificationModalVisible(false);
                navigate('/login');  // Redirige al login
                return true;
            } else {
                console.log("Código incorrecto. Respuesta:", response.status);  // Log si el código es incorrecto
                return false;
            }

        } catch (error) {
            // Depuración: log para ver el error recibido
            console.error("Error al verificar el código:", error);

            // Si hay un error en la respuesta, lo mostramos en el alerta
            alert('Código incorrecto o ha expirado.');
            return false;
        }
    };




    return (
        <div className="flex items-center justify-center min-h-screen mt-4 lg:mt-8">
            <div className="body relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
                <div className="flex h-34 h-auto w-full items-center justify-center rounded-lg bg-color-400 p-3">
                    <div className="h-full w-full text-white flex justify-center">
                        <FondosZoneLogo />
                    </div>
                </div>

                <h1 className="text-xl font-bold dark:text-white">Registro</h1>
                <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-lg">
                    <form onSubmit={handleSubmit}>
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

                        <Button className="mt-4 w-full" aria-disabled={isPending}>
                            Registrarse
                        </Button>
                    </form>

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
            </div>

            {isVerificationModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-xl font-bold mb-4">Introduce el codigo de verificación</h2>
                        <input
                            type="text"
                            placeholder="Ingresa tu código"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <div className="mt-4 flex justify-between">
                            <Button onClick={handleVerificationSubmit} aria-disabled={isVerified}>
                                Verificar
                            </Button>
                            <Button onClick={() => setIsVerificationModalVisible(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
