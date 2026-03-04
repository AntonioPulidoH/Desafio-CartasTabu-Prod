const API_BASE_URL = import.meta.env.VITE_API_URL

export async function updateCards(id: string, payload: Partial<{ keyword:string, forbidenWords:string[] }>) {
  const token = sessionStorage.getItem('access_token');

  const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}