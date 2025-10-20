import type { ICategory } from './ICategory'

export interface IRecipe {
  id: string
  name: string
  description: string
  servings: number
  instructions: string
  category_id: string
  category?: ICategory
  image_url?: string | null
  image_alt?: string | null
  user_id?: string | null
}
