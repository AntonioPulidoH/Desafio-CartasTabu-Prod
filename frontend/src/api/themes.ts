const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getMyThemesCount() {
    const token = sessionStorage.getItem('access_token')

    const res = await fetch(`${API_BASE_URL}/themes/my/count`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok) {
        throw new Error('Error obteniendo el número de temas')
    }

    return res.json()
}