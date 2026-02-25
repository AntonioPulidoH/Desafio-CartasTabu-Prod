
export type CreateRequest = {
    name: string
    creator: string
    vocationalFamily: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function registerColection(payload: CreateRequest) {
    const response = await fetch(`${API_BASE_URL}/colection/register`, {
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
