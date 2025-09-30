import React, { createContext, useEffect, useMemo, useState } from 'react'
import type { IProduct } from '../interfaces/IProduct'
import { getProducts_store } from '../functions/getProducts'
import type { ICustomer } from '../interfaces/ICustomer'
import { getCustomers_store } from '../functions/getCustomers'

export interface MainContextProps {
  products: IProduct[]
  customers: ICustomer[]
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [customers, setCustomers] = useState<ICustomer[]>([])

  useEffect(() => {
    async function getData_in_useEffect() {
      const products_variable_von_der_function = await getProducts_store()
      const customers_variable_von_der_function = await getCustomers_store()

      setProducts(products_variable_von_der_function)
      setCustomers(customers_variable_von_der_function)
    }
    getData_in_useEffect()
  }, [])

  const value = useMemo<MainContextProps>(
    () => ({
      products,
      customers,
    }),
    [products, customers]
  )

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
