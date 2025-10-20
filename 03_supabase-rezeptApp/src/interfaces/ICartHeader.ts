export interface ICartHeader {
  id: number
  user_id: string
  status: 'active' | 'archived' | string
  created_at: string
}
