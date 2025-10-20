import supabase from '../utils/supabase'

export async function addCart(userId: string | undefined, recipeId: string) {
  if (!userId) throw new Error('User nicht eingeloggt')

  const { data: cart, error: cartErr } = await supabase
    .from('recipecart')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle()

  if (cartErr) {
    console.error('Cart lookup error', cartErr)
    throw cartErr
  }

  let cartId: number | undefined = cart?.id

  if (!cartId) {
    const { data: created, error: createErr } = await supabase
      .from('recipecart')
      .insert({ user_id: userId, status: 'active' })
      .select('id')
      .single()

    if (createErr) {
      console.error('Cart create error', createErr)
      throw createErr
    }
    cartId = created.id
  }

  const { error: insertErr } = await supabase
    .from('recipecart_items')
    .upsert(
      { cart_id: cartId, recipe_id: recipeId },
      { onConflict: 'cart_id,recipe_id' }
    )

  if (insertErr) {
    console.error('Cart item insert error', insertErr)
    throw insertErr
  }

  return { cartId }
}
