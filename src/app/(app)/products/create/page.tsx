'use client'

import { FakeApiService } from "@/services/FakeApiService";
import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormErrorMessages from "../components/FormErrorMessages";

const labelClassNames = 'text-xl'
const infoOrganizer = 'flex flex-col md:mx-5 mx-0'
const inputClassNames = 'bg-gray-300/20 rounded-xl p-2 my-3'

export default function CreateProductForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [state, action, isPending] = useActionState(FakeApiService.createProduct, undefined)

  useEffect(() => {
    if (state?.success) {
      setTitle('')
      setCategory('')
      setPrice('')
      setImage('')
      setDescription('')
    }

    if (state?.message.includes('expired')) {
      router.push('/login')
    }
  }, [state])

  return (
    <>
      <h1 className="text-4xl mb-10">Crear un producto:</h1>
      <form
        action={ action }
        className="w-full mx-auto backdrop-blur-lg bg-gray-400/10 shadow shadow-gray-400/60 sm:px-15 px-6 pt-12 pb-8 rounded-xl"
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-y-5 mb-5">
          <div className={ infoOrganizer }>
            <label htmlFor="title" className={ labelClassNames }>Nombre:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={ title }
              onChange={ (e) => setTitle(e.target.value) }
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
              value={ category }
              onChange={ (e) => setCategory(e.target.value) }
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
              value={ price }
              onChange={ (e) => setPrice(e.target.value) }
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
              value={ image }
              onChange={ (e) => setImage(e.target.value) }
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
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
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
        >Crear</button>
      </form>
    </>
  )
}