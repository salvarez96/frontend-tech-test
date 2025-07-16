import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default async function Header() {
  return (
  <div className="h-20 lg:px-20 px-5 bg-gray-400/10 flex-1/2 flex flex-row justify-between">
    <nav className="flex flex-col justify-center">
      <ul className="flex flex-row justify-around gap-6">
        <Link className="hover:text-blue-400" href="/products">Productos</Link>
        <Link className="hover:text-blue-400" href="/products/create">Crear producto</Link>
      </ul>
    </nav>
    <LogoutButton />
  </div>)
}