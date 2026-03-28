import { create } from "zustand";
import API from "../lib/axios";
import { type authStore } from "../types/auth.type";
import axios from "axios";
import { showError, showSuccess } from "../lib/toast";

export const useAuthStore = create<authStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await API.get("/auth/check")
            set({ authUser: response.data })
        } catch {
            set({ authUser: null })
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
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        } finally {
            set({ isLoggingIng: false})
        }
    },

    logout: async () => {
        try {
            await API.post("/auth/logout")
            set({ authUser: null })
            showSuccess("Logged out successfully")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        }
    }
}))
