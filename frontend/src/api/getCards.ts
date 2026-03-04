const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getCards(themeId: number) {
  const response = await fetch(`${API_BASE_URL}/cards/themes/${themeId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}