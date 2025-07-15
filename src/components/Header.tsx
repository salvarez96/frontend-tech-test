import Link from "next/link";

export default function Header() {
  return (
  <div className="h-20 lg:px-20 px-5 bg-gray-400/10 flex-1/2 flex flex-row justify-between">
    <nav className="flex flex-col justify-center">
      <ul className="flex flex-row justify-around gap-6">
        <Link href="/products">Productos</Link>
        <Link href="/products/create">Crear producto</Link>
      </ul>
    </nav>
    <button>Cerrar sesión</button>
  </div>)
}