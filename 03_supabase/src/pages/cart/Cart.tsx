import { useContext, useEffect } from 'react'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import { getCart_V2 } from '../../functions/getCart_V2'
import type { ICart } from '../../interfaces/ICart'
import supabase from '../../utils/supabase'

export default function Cart() {
  const { cart = [], setCart } = useContext(mainContext) as MainContextProps
  const typedCart = cart as ICart[]

  useEffect(() => {
    const getCartData = async () => {
      const myCartResult = await getCart_V2()
      setCart(myCartResult as ICart[])
    }
    getCartData()
  }, [])

  const removeItemFunc = async (productId: number) => {
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', productId)
    if (deleteError) {
      console.error('Fehler beim löschen', deleteError)
    }
    const updatedCart = await getCart_V2()
    setCart(updatedCart as ICart[])
  }

  return (
    <div>
      <h2>Warenkorb</h2>
      {typedCart.map((item, idx) => {
        return (
          <div key={idx}>
            <p>Title: {item.products.title}</p>
            <p>Price: {item.products.price}</p>
            <p>Menge: {item.quantity}</p>
            <button onClick={() => removeItemFunc(item.id)}>
              Delete Product
            </button>
          </div>
        )
      })}
    </div>
  )
}
