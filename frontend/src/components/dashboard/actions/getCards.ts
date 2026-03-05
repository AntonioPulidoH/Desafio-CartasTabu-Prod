const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getCards(themeId: number) {
  const token = sessionStorage.getItem('access_token');
  
  const response =await fetch(`${API_BASE_URL}/cards/themes/${themeId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
console.log('cards data:', JSON.stringify(data[0], null, 2))
  
return data.map((card: any) => ({
  id: String(card.id),
  word: card.word,          
  forbiddenWords: card.forbiddenWords ?? [],  
}));
}