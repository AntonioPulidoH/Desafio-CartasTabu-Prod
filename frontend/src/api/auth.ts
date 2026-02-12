export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    access_token: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok) {
        throw new Error('Login fallido')
    }

    return response.json() as Promise<LoginResponse>
}