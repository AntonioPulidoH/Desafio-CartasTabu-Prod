const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getProfile() {
    const token = sessionStorage.getItem('access_token')

    const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!response.ok) {
        throw new Error('No autorizado')
    }

    return response.json()
}