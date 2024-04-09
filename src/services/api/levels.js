import { instance } from '@/plugins/axios'

export async function getDifficultyLevels() {
  return await instance.get('/api/difficulty-levels')
}
