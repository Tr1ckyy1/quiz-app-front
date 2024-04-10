import { instance } from '@/plugins/axios'

export async function getQuizzes(params) {
  return await instance.get('/api/quizzes', { params })
}
