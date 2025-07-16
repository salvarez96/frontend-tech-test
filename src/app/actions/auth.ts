import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

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

  const { username } = validatedFields.data

  await createSession(username)

  redirect('/products')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}