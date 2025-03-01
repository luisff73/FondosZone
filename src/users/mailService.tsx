import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: [email],
      subject: "Código de Verificación",
      text: `Tu código de verificación es: ${code}`,
    });

    console.log("Correo enviado:", response);
    return response;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
};
