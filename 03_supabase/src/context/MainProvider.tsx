import React, { createContext, useEffect, useState } from 'react'
import type { IProduct } from '../interfaces/IProduct'
import { getProducts_store } from '../functions/getProducts'

export interface MainContextProps {
  products: IProduct[]
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    async function getData_in_useEffect() {
      const products_variable_von_der_function = await getProducts_store()

      setProducts(products_variable_von_der_function)
    }
    getData_in_useEffect()
  }, [])

  return (
    <mainContext.Provider value={{ products }}>{children}</mainContext.Provider>
  )
}
