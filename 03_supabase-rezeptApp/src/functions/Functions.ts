import supabase from '../utils/supabase'
import type { IIngredients } from '../interfaces/IIngredients'
import type { IRecipe } from '../interfaces/IRecipe'
import type { ICategory } from '../interfaces/ICategory'

// # Ingredients

export async function getIngredients(): Promise<IIngredients[]> {
  const { data: ingredients, error } = await supabase
    .from('ingredients')
    .select('*')
  if (error) {
    console.error(error)
  }
  // console.log(ingredients)
  return ingredients as IIngredients[]
}

// # Recipes

export async function getRecipes(): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase.from('recipes').select('*')
  if (error) {
    console.error(error)
  }
  // console.log(recipes)
  return recipes as IRecipe[]
}

// # Category

export async function getCategories(): Promise<ICategory[]> {
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
  if (error) {
    console.error(error)
  }
  // console.log(category)
  return category as ICategory[]
}

// # Recipes TOP 3

export async function getTopRecipes(): Promise<IRecipe[]> {
  const { data, error } = await supabase.from('recipes').select('*').limit(3)
  if (error) {
    console.error(error)
    return []
  }
  console.log(data)
  return data ?? []
}
