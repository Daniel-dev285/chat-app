import MessageBox from "./MessageBox"
import { type Message } from "../types/chat.type"
import { useAuthStore } from "../store/useAuthStore"

interface Props {
    messages: Message[]
}

function ChatHistory({ messages }: Props) {
    const { authUser } = useAuthStore()

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {messages.map(message => {
                return (
                    <div 
                    className={`flex 
                        ${message.senderId === authUser?._id ? "justify-end -rotate-2" : "justify-start rotate-2"}`} 
                    key={message._id}>
                        <MessageBox
                            message={message}
                        />
                    </div>

                )
            })}
        </div>
    )
}

export default ChatHistory


/*
${message.senderId === authUser?._id ? "items-center": "items-center"}`
*/