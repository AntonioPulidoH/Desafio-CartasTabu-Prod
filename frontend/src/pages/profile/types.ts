export type UserProfile = {
    id: number
    name: string
    lastName: string
    email: string
    educationalCenter?: string | null
    role: 'USUARIO' | 'CREADOR' | 'ADMIN'
    permissions: {
        canGenerateCard: boolean
        canCreateThemes: boolean
        canManageUser: boolean
    }
    stats: {
        generatedCards: number
        createdThemes?: number
    }
    preferences: {
        defaultLanguage?: string
        defaultTabuWords?: number
        defaultCardsNumber?: number
        defaultPrintFormat?: string
    }
}