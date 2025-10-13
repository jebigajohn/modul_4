import React, { createContext, useEffect, useState } from 'react'
import type { IProduct } from '../interfaces/IProduct'
import { getProducts_store } from '../functions/getProducts'
import type { ICart } from '../interfaces/ICart'

export interface MainContextProps {
  products: IProduct[]
  cart: ICart[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null>>
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<ICart[] | null>([])

  useEffect(() => {
    async function getData_in_useEffect() {
      const products_variable_von_der_function = await getProducts_store()
      // await getProductAndCategory()
      // await getCart()
      // await getCategory()

      setProducts(products_variable_von_der_function)
    }
    getData_in_useEffect()
  }, [])

  return (
    <mainContext.Provider value={{ products, cart, setCart }}>
      {children}
    </mainContext.Provider>
  )
}
