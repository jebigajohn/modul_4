import supabase from '../utils/supabase'
import type { ICartItem } from '../interfaces/ICartItem'
import type { IRecipe } from '../interfaces/IRecipe'

export async function getCart(userId?: string): Promise<ICartItem[]> {
  if (!userId) return []

  const { data: cart, error: cartErr } = await supabase
    .from('recipecart')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle()

  if (cartErr || !cart) return []

  const { data: rawItems, error: itemsErr } = await supabase
    .from('recipecart_items')
    .select(
      `
      cart_id,
      recipe_id,
      added_at,
      note,
      recipe:recipes!inner (
        id, name, description, servings, instructions,
        category_id, image_url, image_alt, user_id, created_at
      )
    `
    )
    .eq('cart_id', cart.id)

  if (itemsErr || !rawItems) return []

  const normalized: ICartItem[] = rawItems.map((row: any) => {
    const r = Array.isArray(row.recipe) ? row.recipe[0] : row.recipe
    const recipe: IRecipe | undefined = r
      ? {
          id: r.id,
          name: r.name,
          description: r.description,
          servings: r.servings,
          instructions: r.instructions,
          category_id: r.category_id,
          image_url: r.image_url ?? null,
          image_alt: r.image_alt ?? null,
          user_id: r.user_id ?? null,
        }
      : undefined

    return {
      cart_id: row.cart_id as number,
      recipe_id: row.recipe_id as string,
      added_at: row.added_at as string,
      note: row.note ?? null,
      recipe,
    }
  })

  return normalized
}
