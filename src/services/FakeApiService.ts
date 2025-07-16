import { verifySession } from "@/lib/dal"
import {
  CreateProductFormSchema,
  CreateProductFormState,
  EditProductFormSchema,
  EditProductFormState,
  FetchResponse,
  ProductFormFieldErrors
} from "@/lib/definitions"
import axios from "axios"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export class FakeApiService {
  private static FAKE_STORE_PRODUCTS_URL = process.env.NEXT_PUBLIC_FAKE_STORE_API + '/products'

  static async getProducts(): Promise<Product[] | null> {
    try {
      const session = await verifySession()
      if (!session.isAuth) return null

      const response = await axios.get(FakeApiService.FAKE_STORE_PRODUCTS_URL)
      return response.data
    } catch (error) {
      console.error(`Error al traer los productos:`, error)
      throw error
    }
  }

  static async getProduct(id: number): Promise<Product | null> {
    try {
      const session = await verifySession()
      if (!session.isAuth) return null

      const response = await axios.get(FakeApiService.FAKE_STORE_PRODUCTS_URL + `/${id}`)
      return response.data as Product
    } catch (error) {
      console.error(`Error al traer el producto ${id}:`, error)
      throw error
    }
  }

  static async editProduct(state: EditProductFormState, formData: FormData): Promise<FetchResponse<ProductFormFieldErrors, Product>> {
    try {
      const session = await verifySession()
      if (!session.isAuth) return { success: false, message: 'Session expired' }

      const rawImage = formData.get('image')

      const validatedFields = EditProductFormSchema.safeParse({
        title: formData.get('title'),
        category: formData.get('category'),
        price: formData.get('price'),
        description: formData.get('description'),
        image: rawImage === '' ? undefined : rawImage,
      })

      if (!validatedFields.success) {
        return {
          success: false,
          message: 'Error de validación, verificar los datos ingresados',
          errors: validatedFields.error.flatten().fieldErrors
        }
      }

      if (validatedFields.data && !validatedFields.data.image) {
        validatedFields.data.image = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
      }

      const response = await axios.put(`${FakeApiService.FAKE_STORE_PRODUCTS_URL}/${formData.get('id')}`, validatedFields.data)

      return {
        success: true,
        message: `Producto "${response.data.title}" editado con éxito!`,
        data: response.data
      }
    } catch (error) {
      console.error(`Error al editar el producto:`, error)
      return {
        success: false,
        message: `An error has ocurred when editing the product: ${error}`,
      }
    }
  }
  static async createProduct(state: CreateProductFormState, formData: FormData): Promise<FetchResponse<ProductFormFieldErrors, Product>> {
    try {
      const session = await verifySession()
      if (!session.isAuth) return { success: false, message: 'Session expired' }

      const rawImage = formData.get('image')

      const validatedFields = CreateProductFormSchema.safeParse({
        title: formData.get('title'),
        category: formData.get('category'),
        price: formData.get('price'),
        description: formData.get('description'),
        image: rawImage === '' ? undefined : rawImage,
      })

      if (!validatedFields.success) {
        return {
          success: false,
          message: 'Error de validación, verificar los datos ingresados',
          errors: validatedFields.error.flatten().fieldErrors
        }
      }

      if (validatedFields.data && !validatedFields.data.image) {
        validatedFields.data.image = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
      }

      const response = await axios.post(FakeApiService.FAKE_STORE_PRODUCTS_URL, validatedFields.data)

      return {
        success: true,
        message: `Producto "${response.data.title}" creado con éxito!`,
        data: response.data
      }
    } catch (error) {
      console.error(`Error al crear el producto:`, error)
      return {
        success: false,
        message: `An error has ocurred when creating the product: ${error}`,
      }
    }
  }

  static async deleteProduct(id: number): Promise<Product | null> {
    try {
      const session = await verifySession()
      if (!session.isAuth) return null

      const response = await axios.delete(FakeApiService.FAKE_STORE_PRODUCTS_URL + `/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al eliminar el producto ${id}:`, error)
      throw error
    }
  }
}