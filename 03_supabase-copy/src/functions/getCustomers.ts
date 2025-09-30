import type { ICustomer } from '../interfaces/ICustomer'
import supabase from '../utils/supabase'

export async function getCustomers_store(): Promise<ICustomer[]> {
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
  if (error) {
    console.error(error)
  }
  return customers as ICustomer[]
}
