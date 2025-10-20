import type { IRecipe } from './IRecipe'

export interface IIngredients {
  id: number
  recipe_id: string
  name: string
  quantity: number | null
  unit: string | null
  additional_info?: string | null
  recipe?: IRecipe
}
