import type { IRecipe } from './IRecipe'

export interface ICartItem {
  cart_id: number
  recipe_id: string
  added_at: string
  note?: string | null
  recipe?: IRecipe
}
