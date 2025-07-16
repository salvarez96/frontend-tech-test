'use client'

import { Product } from "@/services/FakeApiService";
import Image from "next/image";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteProductButton from "./DeleteProductButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-center align-middle w-8/9 max-w-120 mx-auto backdrop-blur-lg bg-gray-400/10 shadow shadow-gray-400/60 sm:px-8 px-5 py-7 rounded-xl">
      <div className="text-end">
        <Link href={`/products/${product.id}`} className="hover:text-blue-400 mr-2" title="Editar"><EditIcon /></Link>
        <DeleteProductButton id={ product.id } />
      </div>
      <div className="flex flex-col md:flex-row gap-5 my-5">
        <Image
          src={ product.image }
          alt={ product.title + ' image' }
          width={ 120 }
          height={ 120 }
          className="mx-auto lg:mx-0 rounded-md"
        />
        <div className="flex flex-col">
          <p className="text-xl">{ product.title }</p>
          <p className="text-sm">{ product.category }</p>
          <p className="text-2xl self-end">${ product.price }</p>
        </div>
      </div>
      <p className="line-clamp-4 overflow-hidden">{ product.description }</p>
    </div>
  )
}