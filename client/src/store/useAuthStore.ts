import { create } from "zustand";
import API from "../lib/axios";
import { type authStore } from "../types/auth.type";

export const useAuthStore = create<authStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const response = await API.get("/auth/check")

            set({authUser: response.data})
        } catch (error) {
            set({authUser: null})
            console.log("Error in checkAuth", error)
        } finally {
            set({isCheckingAuth: false})
        }
    }
}))