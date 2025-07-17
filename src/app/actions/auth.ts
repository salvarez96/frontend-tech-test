'use server'

import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { Session } from "@/lib/Session";
import { redirect } from "next/navigation";

const VALID_USERNAME = process.env.VALID_USERNAME
const VALID_PASSWORD = process.env.VALID_PASSWORD

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation error',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { username, password } = validatedFields.data

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return {
      success: false,
      message: 'Invalid username and password',
      errors: {
        username: ['Usuario y contraseña inválidos'],
      }
    }
  }

  await Session.createSession(username)

  redirect('/products')
}

export async function logout() {
  await Session.deleteSession()
  redirect('/login')
}