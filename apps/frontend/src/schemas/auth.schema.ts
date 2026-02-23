import { z } from "zod";

// Schema de validación para el formulario de login
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Ingresa tu email",
    })
    .min(1, "Ingresa tu email")
    .trim()
    .email("El email no es válido")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "El email no es válido"
    )
    .refine(
      (value) => !value.startsWith('.') && !value.endsWith('.'),
      { message: "El email no es válido" }
    )
    .refine(
      (value) => !value.includes('..'),
      { message: "El email no es válido" }
    ),
  password: z
    .string({
      required_error: "Ingresa tu contraseña",
    })
    .min(1, "Ingresa tu contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
    ),
});

// Tipo inferido automáticamente desde el schema
export type LoginFormValues = z.infer<typeof LoginSchema>;
