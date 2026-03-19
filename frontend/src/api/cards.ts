const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getMyCardsCount() {
    const token = sessionStorage.getItem('access_token')

    const res = await fetch(`${API_BASE_URL}/cards/my/count`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok) {
        throw new Error('Error obteniendo el número de cartas')
    }

    return res.json()
}