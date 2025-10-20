import React, { createContext, useEffect, useMemo, useState } from 'react'
import {
  getCategories,
  getIngredients,
  getRecipes,
} from '../functions/Functions'
import type { IIngredients } from '../interfaces/IIngredients'
import type { IRecipe } from '../interfaces/IRecipe'
import type { ICategory } from '../interfaces/ICategory'
import type { IUser } from '../interfaces/IUser'
import supabase from '../utils/supabase'
import type { ICartItem } from '../interfaces/ICartItem'

export interface MainContextProps {
  ingredients: IIngredients[]
  recipes: IRecipe[]
  categories: ICategory[]
  user: IUser | null
  cart: ICartItem[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<ICartItem[] | null>>
  isLoggedIn: boolean
  loading: boolean
  // topRecipes: IRecipe[]
  setIngredients: React.Dispatch<React.SetStateAction<IIngredients[]>>
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>
  setCategoies: React.Dispatch<React.SetStateAction<ICategory[]>>
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const mainContext = createContext<MainContextProps | undefined>(
  undefined
)

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [ingredients, setIngredients] = useState<IIngredients[]>([])
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [categories, setCategoies] = useState<ICategory[]>([])
  const [cart, setCart] = useState<ICartItem[] | null>([])

  // # Authentifikation
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // const [topRecipes, setTopRecipes] = useState<IRecipe[]>([])

  useEffect(() => {
    async function getData() {
      const ingredientsFunction = await getIngredients()
      const recipesFunction = await getRecipes()
      const categoriesFunction = await getCategories()
      // const topRecipesFunction = await setTopRecipes()

      setIngredients(ingredientsFunction)
      setRecipes(recipesFunction)
      setCategoies(categoriesFunction)
      // setTopRecipes(topRecipesFunction)
    }
    getData()
  }, [])

  useEffect(() => {
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

  const value = useMemo<MainContextProps>(
    () => ({
      ingredients,
      recipes,
      cart,
      setCart,
      categories,
      user,
      isLoggedIn,
      loading,
      setIngredients,
      setRecipes,
      setCategoies,
      setUser,
      setIsLoggedIn,
      setLoading,
    }),
    [ingredients, recipes, categories, user, isLoggedIn, loading, cart]
  )

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
