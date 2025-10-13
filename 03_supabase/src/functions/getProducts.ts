import type { IProduct } from '../interfaces/IProduct'
import supabase from '../utils/supabase'

export async function getProducts_store(): Promise<IProduct[]> {
  const { data: products, error } = await supabase.from('products').select('*')
  if (error) {
    console.error(error)
  }

  return products as IProduct[]
}

// # selectQueries Filter Supabase Methoden

// Filtern mit eq(), lt(), gt(), like(), between(), in()
// ! lt = lower then => kleiner als
// ! gt = greater then => größer als
// ? 1 SQL CODE
// ? SELECT * FROM products WHERE quality = "High"
// * REACT CODE
// * const { data, error } = await supabase
// *  .from('products')
// *  .select('*')
// *  .eq('quality', 'High')

// ? 2 Quality ist nicht gleich Low
// * const { data: products, error } = await supabase
// *  .from('products')
// *  .select('*')
// *  .neq('quality', 'Low')

// ? 3 SQL CODE
// ? SELECT * FROM products WHERE quality = "High" and price < 500
// * const { data: products, error } = await supabase
// *   .from('products')
// *   .select('*')
// *   .eq('quality', 'High')
// *   .lt('price', 500)

// ? 4 SQL CODE
// ? SELECT * FROM products WHERE price >= 50 AND price <= 200
// *  const { data: products, error } = await supabase
// *   .from('products')
// *   .select('*')
// *   .gte('price', 50)
// *   .lte('price', 200)

// * const { data: products, error } = await supabase
// *  .from('products')
// *  .select('*')
// *  .eq('quality', 'High')
// *  .gte('price', 50)
// *  .lte('price', 200)

// ! Alternative
// * .from('products')
// *  .select('price')
// *  .range(50, 200)

// ? 5 SQL CODE
// ? SELECT * FROM products WHERE quality IN ("High", Medium
// * .from('products')
// * .select('*')
// * .in("quality", ["High", "Medium"])

// ? 6 SQL CODE
// ? SELECT * FROM products WHERE quality = "High" OR price < 50
// * .from('products')
// * .select('*')
// * .or("quality.eq.High, price.lt.50")

// ? 7 SQL CODE
// ? SELECT * FROM products WHERE price >= 50 AND quality = "High"
// .from('products')
// .select('*')
// .filter("price", "gte", 50)
// .filter("quality", "eq", "High")

// ? 8 SQL CODE
// ? SELECT * FROM products WHERE title LIKE "%laptop%"
// .from('products')
// .select('*')
// .ilike("title", "%laptop%")

// ? 9 Nur zwei spalten anzeigen Title und Price
// const { data: products, error } = await supabase
//   .from('products')
//   .select('title, price')
//   .eq('quality', 'High')

// ? Just to know
// const { data: products, error } = await supabase
//   .from('products')
//   .select('*')
//   .textSearch('title', 'laptop | maus')
