import { useContext, useEffect } from 'react'
import supabase from '../../utils/supabase'
import { Link, useNavigate } from 'react-router'

import { mainContext } from '../../context/MainProvider'
import type { IUser } from '../../interfaces/IUser'
import type { ICartItem } from '../../interfaces/ICartItem'
import { getCart } from '../../functions/getCart'
import { RecipeCard } from '../../components/recipebook/RecipeCard'

interface ICartProps {
  user: IUser
  cart: ICartItem[]
  setCart: React.Dispatch<React.SetStateAction<ICartItem[] | unknown>>
}

export default function Cart() {
  // ! NEW
  const { user, cart, setCart } = useContext(mainContext) as ICartProps
  const navigate = useNavigate()

  console.log(user)

  useEffect(() => {
    const fetchCart = async () => {
      const result = await getCart(user.id)
      setCart(result)
    }
    fetchCart()
  }, [user?.id])

  const removeItem = async (cart_id: number, recipe_id: string) => {
    const { error } = await supabase
      .from('recipecart_items')
      .delete()
      .eq('cart_id', cart_id)
      .eq('recipe_id', recipe_id)

    if (error) {
      console.error('Fehler beim Löschen des Items', error)
    }
    const updatedCart = await getCart(user.id)
    setCart(updatedCart as ICartItem[])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          Deine Rezepte
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4">Deine Rezeptsammlung ist derzeit leer.</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Lass uns kochen
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cart.map((item: ICartItem) => (
                <div
                  key={`${item.cart_id}-${item.recipe_id}`}
                  className="relative group"
                >
                  <RecipeCard
                    id={item.recipe_id} // string
                    title={item.recipe?.name ?? 'Rezept'}
                    image={item.recipe?.image_url ?? '/img/placeholder.jpg'}
                    rating={0}
                    time={'—'}
                    difficulty={'—'}
                    category={'Gespeichert'}
                    onClick={() => navigate(`/rezepte/${item.recipe_id}`)}
                  />
                  <button
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-md px-2 py-1 text-sm"
                    onClick={() => removeItem(item.cart_id, item.recipe_id)}
                  >
                    Entfernen
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
