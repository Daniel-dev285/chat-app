import type { Socket } from "socket.io-client"

export interface authUser {
     _id: string
    email: string,
    fullName: string,
    profilePic?: string,
    createdAt: string,
    updatedAt: string,
}

export interface authSignup {
    fullName: string
    email: string
    password: string
}

export interface authLogin {
    email: string
    password: string
}

export interface authStore {
    authUser: authUser | null
    socket: Socket | null
    isSigningUp: boolean
    isLoggingIng: boolean
    isUpdatingProfile: boolean
    isCheckingAuth: boolean
    onlineUsers: string[]

    checkAuth: () => Promise<void>
    signup: (data: authSignup) => Promise<void>
    login: (data: authLogin) => Promise<void>
    logout: () => Promise<void>
    updateProfile : (data) => Promise<void>
    connectSocket: () => void
    disconnectSocket: () => void
}
