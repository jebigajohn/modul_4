import supabase from '../utils/supabase'

export async function addCart(userId: string | undefined, productId: number) {
  // # Wir prüfen, ob das Produkt schon im Warenkorb liegt

  // # NEW
  const { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('*')
    .eq('customer_id', userId)
  if (cartError) {
    console.error('Fehler beim Aufrufen des Warenkorb', cartError)
  }

  console.log(cart)

  const cartId = cart?.[0].id

  const { data: existingItem, error: errorItem } = await supabase
    .from('cart_items')
    .select('*')
    // diese cart_id, 1 ist hardcoded, weil wir noch keinen User haben
    // ! NEW
    .eq('cart_id', cartId)
    .eq('product_id', productId)

  if (errorItem) {
    console.error('Fehler beim überprüfen des Warenkorbs', errorItem)
  }

  console.log(existingItem)

  const existedItem = existingItem?.[0]

  if (existedItem) {
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({
        quantity: existedItem.quantity + 1,
      })
      .eq('id', existedItem.id)
    if (updateError) {
      console.error('Fehler beim aktualisieren', updateError)
    } else {
      console.log('Menge erhöht')
    }
  } else {
    // ? Falls Produkt nicht vorhanden ist, neues Product hinzufügen
    const { error: insertError } = await supabase.from('cart_items').insert({
      // ! NEW
      cart_id: cartId,
      product_id: productId,
      quantity: 1,
    })
    if (insertError) {
      console.error('Fehler beim einfügen', insertError)
    } else {
      console.log('Produkt wurde zum Warenkorb hinzugefügt')
    }
  }
}
