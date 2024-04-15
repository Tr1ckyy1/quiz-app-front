import { instance } from '@/plugins/axios'

export async function getQuizzes(params) {
  return await instance.get('/api/quizzes', { params })
}

export async function getQuiz(id, testPage = null) {
  return await instance.get(`api/quizzes/${id}`, {
    params: {
      testPage
    }
  })
}

export async function getSimilarQuizzes(categoryIds, excludeId) {
  return await instance.get(`api/similar-quizzes`, {
    params: { categoryIds, excludeId }
  })
}

export async function submitQuiz(data) {
  return await instance.post(`api/submit-quiz`, data)
}
