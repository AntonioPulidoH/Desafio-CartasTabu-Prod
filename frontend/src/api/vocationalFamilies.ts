const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getVocationalFamilies() {
    const response = await fetch(`${API_BASE_URL}/vocational-families`)

    if(!response.ok) {
        throw new Error('Error cargando familias profesionales')
    }

    return response.json()
}