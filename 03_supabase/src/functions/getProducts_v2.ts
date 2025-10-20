import { data } from 'react-router'
import type { IProduct } from '../interfaces/IProduct'
import supabase from '../utils/supabase'
import type { ICart } from '../interfaces/ICart'
import type { ICategory } from '../interfaces/ICategory'

// # Produkte + Kategorien anzeigen

export async function getProductAndCategory(): Promise<IProduct[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, title, price, quality,category:categories(category_name)')
  if (error) {
    console.error(error)
  }
  return products as unknown as IProduct[]
}

// # Cart_Items mit Produkten + Kategorien

export async function getCart(): Promise<ICart> {
  const { data: cart, error } = await supabase
    .from('cart_items')
    .select(
      'id, cart_id, quantity, products:products(id,title,price,quality,categories(category_name))'
    )
  if (error) {
    console.error(error)
  }
  return cart as unknown as ICart
}

export async function getCategory(): Promise<ICategory> {
  const { data: category, error } = await supabase
    .from('categories')
    .select('category_name, products_table:products(*)')
  if (error) {
    console.error(error)
  }
  return category as unknown as ICategory
}
