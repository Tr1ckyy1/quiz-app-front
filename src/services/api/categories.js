import { instance } from '@/plugins/axios'

export async function getCategories() {
  return await instance.get('/api/categories')
}
