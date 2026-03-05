const API_BASE_URL = import.meta.env.VITE_API_URL

export async function deleteThemes(idTheme:string) {
    const token = sessionStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/themes/${idTheme}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    return response.json()
}