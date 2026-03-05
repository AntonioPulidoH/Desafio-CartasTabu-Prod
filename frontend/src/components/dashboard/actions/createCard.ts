export type CreateCardRequest = {
    keyword: string
    themeId: number
    forbiddenWords: string[]

}

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function createCard(payload: CreateCardRequest) {
  const token = sessionStorage.getItem('access_token');
    console.log('token:', token);
  
  const response = await fetch(`${API_BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json()
}