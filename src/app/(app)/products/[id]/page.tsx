import { FakeApiService } from "@/services/FakeApiService"
import EditProductForm from "../components/EditProductForm"
import { redirect } from "next/navigation"

export default async function Product({ params }: {
  params: { id: string }
}) {
  const { id } = await params
  const product = await FakeApiService.getProduct(Number(id))
  if (!product) redirect('/login')

  return (
    <>
      <h1 className="text-4xl mb-10">Edición de producto:</h1>
      <EditProductForm product={ product } />
    </>
  )
}