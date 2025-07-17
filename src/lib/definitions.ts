import { z } from "zod"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

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
  title: z.string().min(3, { message: 'El producto debe tener un nombre de al menos 3 letras' }).trim(),
  category: z.string().min(3, { message: 'La categoría no puede estar vacía' }).trim(),
  price: z.coerce.number({ message: 'El precio debe ser un número' }).min(1, { message: 'El precio no puede ser negativo o 0' }),
  description: z.string().min(3, { message: 'La descripción no puede estar vacía' }).trim(),
  image: z.url().optional()
})

export const EditProductFormSchema = CreateProductFormSchema

export type ProductFormFieldErrors = {
  title?: string[]
  category?: string[],
  price?: string[],
  description?: string[],
  image?: string[]
}

export type EditProductFormState = {
  errors?: ProductFormFieldErrors
  message?: string
} | undefined

export type CreateProductFormState = EditProductFormState

export type FetchResponse<T, E> = {
  success: boolean,
  message: string,
  errors?: T,
  data?: E
}