import axios from 'axios'
import router from '@/router'

export const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  xsrfCookieName: 'XSRF-TOKEN',
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
})

export async function getCsrfCookie() {
  await instance.get('/sanctum/csrf-cookie')
}
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 404 || status === 500) {
        router.replace({ name: 'error', params: { status } })
      }
    }
    return Promise.reject(error)
  }
)
