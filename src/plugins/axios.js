import axios from 'axios'

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
