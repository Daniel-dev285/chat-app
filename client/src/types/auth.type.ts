export interface authUser {
    id: string
    username: string
    email: string
    profilePicture: string
    createdAt: string
    updatedAt: string
}

export interface authStore {
    authUser: authUser | null
    isSigningUp: boolean
    isLoggingIng: boolean
    isUpdatingProfile: boolean

    isCheckingAuth: boolean

    checkAuth: () => Promise<void>
}