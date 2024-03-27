import { API_URL } from '../api'

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
    const customError = new Error('An error occurred')
    customError.errorMessages = responseData.errors
    throw customError
  }
}
