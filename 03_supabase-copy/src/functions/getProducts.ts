import type { IProduct } from '../interfaces/IProduct'
import supabase from '../utils/supabase'

export async function getProducts_store(): Promise<IProduct[]> {
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) {
    console.error(error)
  }

  return products as IProduct[]
}
