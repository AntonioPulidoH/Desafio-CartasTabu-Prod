const API_BASE_URL = import.meta.env.VITE_API_URL

export async function deleteThemes(idTheme:string) {
    const response = await fetch(`${API_BASE_URL}/themes/${idTheme}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    return response.json()
}