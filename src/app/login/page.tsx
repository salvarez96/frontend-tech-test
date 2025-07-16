'use client'

import { useActionState } from "react"
import { login } from "../actions/auth"

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="grid grid-cols-1 justify-center items-center h-dvh w-full">
      <div className="flex flex-col justify-center align-middle w-8/9 max-w-120 mx-auto backdrop-blur-lg bg-gray-400/10 shadow shadow-gray-400/60 sm:px-15 px-6 pt-12 pb-8 rounded-xl">
        <h1 className="text-center text-3xl">Hola, inicia sesión</h1>

        <form action={action} className="flex flex-col mt-9 mb-6">
          <label htmlFor="username" className="text-xl">Usuario</label>
          <input type="text" name="username" id="username" className="bg-gray-300/20 rounded-xl p-2 my-3" />
          { state?.errors?.username && <div className="bg-red-500/50 p-5 mb-3 rounded-sm"><p>{ state.errors.username }</p></div> }

          <label htmlFor="password" className="text-xl">Contraseña</label>
          <input type="password" name="password" id="password" className="bg-gray-300/20 rounded-xl p-2 my-3" />
          {state?.errors?.password && (
            <div className="bg-red-500/50 p-5 mb-3 rounded-sm">
              <p>La contraseña debe:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          <button disabled={pending} className="mx-auto rounded-xl bg-blue-600 hover:bg-blue-400 disabled:bg-blue-300 hover:cursor-pointer disabled:cursor-not-allowed text-xl mt-6 py-2 px-6 w-11/12">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}