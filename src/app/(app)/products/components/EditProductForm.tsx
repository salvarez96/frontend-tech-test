'use client'

import { FakeApiService, Product } from "@/services/FakeApiService";
import { useActionState, useEffect, useState } from "react";
import FormErrorMessages from "./FormErrorMessages";
import { useRouter } from "next/navigation";

const labelClassNames = 'text-xl'
const infoOrganizer = 'flex flex-col md:mx-5 mx-0'
const inputClassNames = 'bg-gray-300/20 rounded-xl p-2 my-3'

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter()
  const [formData, setFormData] = useState(product)
  const [state, action, isPending] = useActionState(FakeApiService.editProduct, undefined)

  useEffect(() => {
    if (state?.success && state.data) {
      setFormData(state.data)
    } else if (state?.message.includes('expired')) {
      router.push('/login')
    }
  }, [state])

  return (
    <form
      action={ action }
      className="w-full mx-auto backdrop-blur-lg bg-gray-400/10 shadow shadow-gray-400/60 sm:px-15 px-6 pt-12 pb-8 rounded-xl"
    >
      <div className="grid md:grid-cols-2 grid-cols-1 gap-y-5 mb-5">
        <input type="hidden" name="id" id="id" value={ product.id } />
        <div className={ infoOrganizer }>
          <label htmlFor="title" className={ labelClassNames }>Nombre:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={ state?.data?.title ? state.data.title : product.title }
            className={ inputClassNames }
          />
          { state?.errors?.title &&
            <FormErrorMessages errors={ state.errors.title } textMessage="El nombre del producto debe contener:" />
          }
        </div>

        <div className={ infoOrganizer }>
          <label htmlFor="category" className={ labelClassNames }>Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={ state?.data?.category ? state.data.category : product.category }
            className={ inputClassNames }
          />
          { state?.errors?.category &&
            <FormErrorMessages errors={ state.errors.category } textMessage="La categoría del producto debe contener:" />
          }
        </div>

        <div className={ infoOrganizer }>
          <label htmlFor="price" className={ labelClassNames }>Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            step={0.01}
            defaultValue={ state?.data?.price ? state.data.price :product.price }
            className={ inputClassNames }
          />
          { state?.errors?.price &&
            <FormErrorMessages errors={ state.errors.price } textMessage="El precio del producto debe contener:" />
          }
        </div>

        <div className={ infoOrganizer }>
          <label htmlFor="image" className={ labelClassNames }>Imagen (opcional):</label>
          <input
            type="url"
            id="image"
            name="image"
            defaultValue={ state?.data?.image ? state.data.image : product.image }
            className={ inputClassNames }
          />
          { state?.errors?.image &&
            <FormErrorMessages errors={ state.errors.image } textMessage="La imagen del producto debe contener:" />
          }
        </div>
      </div>

      <div className={ infoOrganizer }>
        <label htmlFor="description" className={ labelClassNames }>Descripción:</label>
        <textarea
          id="description"
          name="description"
          defaultValue={ state?.data?.description ? state.data.description : product.description }
          className={ inputClassNames + ' sm:min-h-25 min-h-35' }
        ></textarea>
        { state?.errors?.description &&
          <FormErrorMessages errors={ state.errors.description } textMessage="La descripción del producto debe contener:" />
        }
      </div>
        { !state?.success && state?.message &&
          <div className="bg-red-500/50 p-5 mb-3 rounded-sm md:mx-5">
            <p>{ state?.message }</p>
          </div>
        }
        { state?.success &&
          <div className="bg-green-500/50 p-5 mb-3 rounded-sm md:mx-5">
            <p>{ state.message }</p>
          </div>
        }

      <button
        type="submit"
        disabled={ isPending }
        className="block mx-auto rounded-xl bg-blue-600 hover:bg-blue-400 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 text-xl mt-6 py-2 px-6 sm:w-9/12 w-full"
      >Editar</button>
    </form>
  )
}