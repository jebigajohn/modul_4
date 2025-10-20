import { useContext } from 'react'
import { mainContext } from '../context/MainProvider'

export default function useRecipes() {
  const context = useContext(mainContext)
  if (!context) throw new Error('Sorry, useContext is not working')
  return context
}
