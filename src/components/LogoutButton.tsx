'use client'

import { logout } from "@/app/actions/auth";

export function LogoutButton() {
  return (
    <form className="flex align-center" action={logout}>
      <button type="submit" className="hover:cursor-pointer hover:text-red-400">Cerrar sesión</button>
    </form>
  )
}