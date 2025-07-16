import { FakeApiService } from "@/services/FakeApiService";
import { ProductCard } from "./components/ProductCard";
import { redirect } from "next/navigation";

export default async function Products() {
  const products = await FakeApiService.getProducts()
  if (!products) redirect('/login')
  return (
    <>
      <h1 className="ml-5 text-4xl">{products.length} products found</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 mb-20">
        { products.map((product, index) => (
          <ProductCard product={ product } key={ product.title + index } />
        ))}
      </div>
    </>
  )
}