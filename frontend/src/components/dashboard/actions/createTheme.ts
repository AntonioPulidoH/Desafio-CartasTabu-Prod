export type CreateThemeRequest = {
    name: string
    description?: string
    vocationalFamilyId: number
    creatorId?: number

}

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function createTheme(payload: CreateThemeRequest) {
  const token = sessionStorage.getItem('access_token');
  
  const response = await fetch(`${API_BASE_URL}/themes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...payload,
      creatorId: Number(1)//Esto lo dejo para el sprint pero no está bien
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}