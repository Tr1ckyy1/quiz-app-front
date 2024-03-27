export async function signup(data) {
  const res = await fetch('http://127.0.0.1:8000/api/signup', {
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
