import { instance } from '@/plugins/axios'

export async function getQuizzes(params) {
  return await instance.get('/api/quizzes', { params })
}

export async function getQuiz(id) {
  return await instance.get(`api/quizzes/${id}`)
}

export async function getSimilarQuizzes(categoryIds, excludeId) {
  return await instance.get(`api/similar-quizzes`, {
    params: { categoryIds, excludeId }
  })
}
