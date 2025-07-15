import axios from "axios"

interface Product {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export class FakeApiService {
  private static FAKE_STORE_PRODUCTS_URL = process.env.FAKE_STORE_URL + '/products'

  static async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(this.FAKE_STORE_PRODUCTS_URL)
      return response.data
    } catch (error) {
      console.error(`Error al traer los productos:`, error)
      throw error
    }
  }

  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await axios.get(this.FAKE_STORE_PRODUCTS_URL + `/${id}`)
      return response.data as Product
    } catch (error) {
      console.error(`Error al traer el producto ${id}:`, error)
      throw error
    }
  }

  static async editProduct(product: Product): Promise<Product> {
    try {
      const response = await axios.post(this.FAKE_STORE_PRODUCTS_URL, product)
      return response.data
    } catch (error) {
      console.error(`Error al traer crear el producto:`, error)
      throw error
    }
  }

  static async deleteProduct(id: number): Promise<Product> {
    try {
      const response = await axios.delete(this.FAKE_STORE_PRODUCTS_URL + `/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar el producto ${id}:`, error)
      throw error
    }
  }
}