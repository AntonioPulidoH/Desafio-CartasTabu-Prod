const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getThemes() {
    const token = sessionStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/themes`, {
        method: 'GET',
        headers: {
             'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    const data = await response.json()
    console.log('themes data:', JSON.stringify(data[0]?.cards?.[0], null, 2))

    return data.map((theme: any) => ({
        ...theme,
        cards: (theme.cards ?? []).map((card: any) => ({
            id: String(card.id),
            word: card.keyword,
            forbiddenWords: (card.forbiddenWords ?? []).map((fw: any) => fw.word),
        }))
    }))
}