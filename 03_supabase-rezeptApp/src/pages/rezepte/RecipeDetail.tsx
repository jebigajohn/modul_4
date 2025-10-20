import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { IRecipe } from '../../interfaces/IRecipe'
import type { IIngredients } from '../../interfaces/IIngredients'
import supabase from '../../utils/supabase'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<IRecipe | null>(null)
  const [ingredients, setIngredients] = useState<IIngredients[]>([])

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()
      if (recipeError) console.error(recipeError)
      setRecipe(recipeData)

      const { data: ingredientData, error: ingredientError } = await supabase
        .from('ingredients')
        .select('*')
        .eq('recipe_id', id)
      if (ingredientError) console.error(ingredientError)
      setIngredients(ingredientData ?? [])
    })()
  }, [id])

  if (!recipe) return <p>Lade Rezept...</p>

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.image_alt ?? recipe.name}
          className="w-full rounded-lg mb-4"
        />
      )}
      <p className="text-gray-700 mb-6">{recipe.description}</p>

      <h3 className="text-xl font-semibold mb-2">Zutaten</h3>
      <ul className="list-disc list-inside mb-6">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.quantity ?? ''} {ingredient.unit ?? ''}{' '}
            {ingredient.name}
            {ingredient.additional_info
              ? `(${ingredient.additional_info})`
              : ''}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Zubereitung</h3>
      <p className="whitespace-pre-line">{recipe.instructions}</p>
    </section>
  )
}
