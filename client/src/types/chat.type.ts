import { type authUser } from "./auth.type";

export interface Message {
    _id: string;
    senderId: string
    receiverId: string
    text?:string
    image?:string
    createdAt: string
    updatedAt: string
}



export interface ChatStore {
    messages: Message[],
    users: authUser[],
    selectedUser: authUser | null ,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,

    getUsers: () => Promise<void>
    getMessages: (userId: string | undefined) => Promise<void>
    sendMessages: (message: {text: string}) => Promise<void>
    setSelectedUser: (selectedUser: authUser) => void
}

