import { z } from "zod"

export const LoginFormSchema = z.object({
  username: z.email({ message: 'Ingresa un email válido' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Debe contener al menos 6 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Debe contener al menos una letra' })
    .regex(/[0-9]/, { message: 'Debe contener al menos un número' })
})

export type LoginFormState = {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export const CreateProductFormSchema = z.object({
  name: z.string().min(3, { message: 'El producto debe tener un nombre de al menos 3 letras' }).trim(),
  category: z.string().trim(),
  price: z.number().min(1, { message: 'El precio no puede ser negativo o 0' }),
  description: z.string().trim(),
  image: z.url().trim().optional()
})