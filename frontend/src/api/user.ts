const API_BASE_URL = import.meta.env.VITE_API_URL_

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

export async function updateProfile(payload: {
    email?: string
    password?: string
    educationalCenter?: string | null
    vocationalFamilyId?: number | null
}) {
    const token = sessionStorage.getItem('access_token')

    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok) {
        throw new Error('Error actualizando el usuario')
    }

    return response.json()
}