import { create } from "zustand";
import API from "../lib/axios";
import { type authStore } from "../types/auth.type";
import axios from "axios";
import { showError, showSuccess } from "../lib/toast";
import { io } from "socket.io-client"

const BASE_URL = 'http://localhost:3000'

export const useAuthStore = create<authStore>((set, get) => ({
    authUser: null,
    socket: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await API.get("/auth/check")
            set({ authUser: response.data })

            get().connectSocket()
        } catch {
            set({ authUser: null })
            showError("Unexpected error")
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })

        try {
            const response = await API.post("/auth/signup", data)
            set({ authUser: response.data })
            showSuccess("Account created successfully")

            get().connectSocket()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true })

        try {
            const response = await API.post("/auth/login", data)
            set({ authUser: response.data })
            showSuccess("Logged in successfully")

            get().connectSocket()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        } finally {
            set({ isLoggingIng: false })
        }
    },

    logout: async () => {
        try {
            await API.post("/auth/logout")
            set({ authUser: null })
            showSuccess("Logged out successfully")
            
            get().disconnectSocket()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        }
    },

    updateProfile: async (data) => {
        // todo
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: { userId: authUser._id },
            auth: {
                serverOffset: 0
            }
        })
        socket.connect()
        set({ socket })

        socket.on("getOnlineUsers", (usersId) => {
            set({ onlineUsers: usersId})
        })
    },

    disconnectSocket: () => {
        const { socket } = get()
        if (socket?.connected) {
            socket.disconnect()
        }
        set({ socket: null })
    }
}))
