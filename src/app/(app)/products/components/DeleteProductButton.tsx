'use client'

import { FakeApiService } from "@/services/FakeApiService"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteProductButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      const toastId = toast.loading('Eliminando producto...')
      FakeApiService.deleteProduct(id)
        .then(product => {
          console.log(product)
          toast.update(toastId, {
            render: `Producto "${product?.title}" eliminado con éxito`,
            type: 'success',
            isLoading: false,
            autoClose: 4000
          })
        })
        .catch(error => {
          console.error(error)
          toast.update(toastId, {
            render: 'Hubo un error al eliminar el producto',
            type: 'error',
            isLoading: false,
            autoClose: 4000
          })
        })
        .finally(() => setLoading(false))
    }
  }, [loading])

  return (
    <>
      <button
        type="button"
        title="Eliminar"
        onClick={ () => setLoading(true) }
        disabled={ loading }
        className="hover:text-red-400 hover:cursor-pointer disabled:cursor-not-allowed disabled:text-red-300"
      >
        <RemoveCircleIcon />
      </button>
    </>
  )
}