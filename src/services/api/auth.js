import { API_URL } from '@/api'

export async function signup(data) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.status === 500) {
    throw new Error('The server encountered an unexpected error, please try again later')
  }
  if (!res.ok && res.status !== 500) {
    const responseData = await res.json()
    const customError = new Error('An error occurred')
    customError.errorMessages = responseData.errors
    throw customError
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

export async function resend({ id, expires }) {
  const res = await fetch(`${API_URL}/email/verification-notification`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, expires })
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message)
  }
  return data
}
