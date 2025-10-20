import React, { createContext, useEffect, useState } from 'react'
import type { IProduct } from '../interfaces/IProduct'
import { getProducts_store } from '../functions/getProducts'
import type { ICart } from '../interfaces/ICart'
import type { IUser } from '../interfaces/IUser'
import supabase from '../utils/supabase'

export interface MainContextProps {
  products: IProduct[]
  cart: ICart[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<ICart[] | null>>
  // # new
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<ICart[] | null>([])

  // # New
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

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

  console.log(products)

  useEffect(() => {
    // ! Wir holen einmalig den gespeicherten Zustand (z.B. beim Reload) oder Login
    // Supabase prüft ob im Browser eine gültige Session gespeichert ist,
    // Wenn ja => liefert den eingeloggten User zurück
    // Wenn nein => User = null

    const checkSession = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getSession()
      const session = data?.session
      if (session?.user) {
        setUser(session?.user as unknown as IUser)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
      setLoading(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event)
      console.log(session)
      setUser((session?.user as unknown as IUser) || null)
      setIsLoggedIn(!!session?.user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <mainContext.Provider
      value={{
        products,
        cart,
        setCart,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loading,
      }}
    >
      {children}
    </mainContext.Provider>
  )
}
