import { create } from "zustand"
import API from "../lib/axios";
import { showError } from "../lib/toast";
import axios from "axios";
import { type ChatStore } from "../types/chat.type";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const response = await API.get("/messages/users")
            set({ users: response.data })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const response = await API.get(`/messages/${userId}`)
            set({ messages: response.data })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessages: async (message) => {
        const { selectedUser, messages } = get()

        try {
            const response = await API.post(`/messages/send/${selectedUser?._id}`, message)
            set({ messages: [...messages, response.data] })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message)
            } else {
                showError("Unexpected error")
            }
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return

        const socket = useAuthStore.getState().socket

        socket?.on('newMessage', (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return
            set({ messages: [...get().messages, newMessage] })
        })
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket
        socket?.off('newMessage')
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))