const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getVocationalFamilies() {
    const response = await fetch(`${API_BASE_URL}/families`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    return response.json()
}