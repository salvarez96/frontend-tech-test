'use client'

import { logout } from "@/app/actions/auth";
import LogoutIcon from '@mui/icons-material/Logout';

export function LogoutButton() {
  return (
    <form className="flex align-center" action={logout}>
      <button type="submit" className="hover:cursor-pointer hover:text-red-400"><LogoutIcon /> Salir</button>
    </form>
  )
}