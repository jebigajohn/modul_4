// recipeMappers.ts
import type { IRecipe } from '../interfaces/IRecipe'
import type { ICategory } from '../interfaces/ICategory'

export type RecipeCardVM = {
  id: string
  title: string
  image: string
  rating: number
  time: string
  difficulty: string
  category: string
}

export function toRecipeCardVM(
  r: IRecipe,
  categories: ICategory[]
): RecipeCardVM {
  const catName =
    categories.find((c) => c.id === r.category_id)?.name ?? 'Uncategorized'

  return {
    id: r.id, // uuid (string)
    title: r.name, // map
    image: r.image_url ?? '/img/placeholder.jpg',
    rating: 0, // für später
    time: '—', // für später
    difficulty: '—', // für später
    category: catName,
  }
}
