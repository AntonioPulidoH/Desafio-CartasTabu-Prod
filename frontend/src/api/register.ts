export type RegisterRequest = {
    name: string
    lastName: string
    email: string
    password: string
    educationalCenter?: string | null
}

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function register(payload: RegisterRequest) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    return response.json()
}
