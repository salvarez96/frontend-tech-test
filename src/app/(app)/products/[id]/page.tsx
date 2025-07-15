export default function Product({ params }: {
  params: { id: string }
}) {
  const { id } = params
  return (
    <>
      <h1>Product {id}</h1>
    </>
  )
}