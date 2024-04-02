import { API_URL, BACK_URL } from '@/api'

// import axios from 'axios'

// const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

// const apiClient = axios.create({
//   withCredentials: true,
//   baseURL: baseURL,
//   xsrfCookieName: 'XSRF-TOKEN',
//   withXSRFToken: true,
//   headers: {
//     'Content-Type': 'application/json',
//     accept: 'application/json'
//   }
// })

// async function getCsrfCookie() {
//   return await apiClient.get('/sanctum/csrf-cookie', { withCredentials: true })
// }

export async function signup(data) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const responseData = await res.json()
    const customError = new Error()
    customError.message = responseData.message
    customError.errorMessages = responseData.errors
    throw customError
  }
}

export async function login(data) {
  // await getCsrfCookie()
  // return await apiClient.post('api/login', data)

  const sanctumRes = await fetch(`${BACK_URL}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include'
  })

  if (!sanctumRes.ok) {
    throw new Error('Failed to fetch CSRF token')
  }

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const responseData = await res.json()

  if (!res.ok) {
    const customError = new Error()
    customError.message = responseData.message
    customError.errorMessages = responseData.errors
    throw customError
  }
  return responseData
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  console.log(res)

  const data = await res.json()

  console.log(data)
  if (!res.ok) {
    throw new Error('Something went wrong')
  }
}

export async function verifyUser({ id, hash, expires, signature }) {
  const res = await fetch(
    `${API_URL}/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
  )
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function resend({ id, hash, expires }) {
  const res = await fetch(`${API_URL}/email/verification-notification`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, hash, expires })
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message)
  }
  return data
}
