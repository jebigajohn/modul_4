import supabase from '../utils/supabase'

export async function addCart(productId: number) {
  // # Wir prüfen, ob das Produkt schon im Warenkorb liegt
  const { data: existingItem, error: errorItem } = await supabase
    .from('cart_items')
    .select('*')
    // diese cart_id, 1 ist hardcoded, weil wir noch keinen User haben
    .eq('cart_id', 1)
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
      cart_id: 1,
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
