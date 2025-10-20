import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { mainContext } from '../context/MainProvider'
import type { MainContextProps } from '../context/MainProvider'
import { addCart } from '../functions/addCart'

type WithId = { id: string } | string

export function useAddToBook() {
  const navigate = useNavigate()
  const { user } = useContext(mainContext) as MainContextProps

  async function handleAddToBook(item: WithId) {
    if (!user?.id) {
      console.error('Bitte einloggen, um Rezepte zu speichern.')
      return
    }

    const recipeId = typeof item === 'string' ? item : item.id

    try {
      await addCart(user.id, recipeId)
      navigate('/cart')
    } catch (err) {
      console.error('Fehler beim Hinzufügen zum Rezeptbuch', err)
    }
  }

  return { handleAddToBook }
}
