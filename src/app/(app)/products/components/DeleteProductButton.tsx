import { FakeApiService } from "@/services/FakeApiService"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from "react";

export default function DeleteProductButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)

  const handleProductDelete = async () => {
    setLoading(true)
    FakeApiService.deleteProduct(id)
      .then(product => console.log(product))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }
  return (
    <button
      type="button"
      title="Eliminar"
      onClick={ handleProductDelete }
      disabled={ loading }
      className="hover:text-red-400 hover:cursor-pointer disabled:cursor-not-allowed disabled:text-red-300"
    >
      <RemoveCircleIcon />
    </button>
  )
}