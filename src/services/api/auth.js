import { instance } from '@/plugins/axios'

export async function signup(data) {
  return await instance.post('/api/signup', data)
}

export async function login(data) {
  await instance.post('/api/login', data)
  if (!localStorage.getItem('loggedIn')) localStorage.setItem('loggedIn', true)
}

export async function logout() {
  await instance.post('/api/logout')
  if (localStorage.getItem('loggedIn')) localStorage.removeItem('loggedIn')
}

export async function verifyUser({ id, hash, expires, signature }) {
  return await instance.get(
    `/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
  )
}

export async function resend({ id, hash, expires }) {
  return await instance.post('/api/email/verification-notification', { id, hash, expires })
}
