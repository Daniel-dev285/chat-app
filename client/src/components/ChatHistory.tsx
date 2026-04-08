import { useEffect, useRef } from "react"
import MessageBox from "./MessageBox"
import { type Message } from "../types/chat.type"
import { useAuthStore } from "../store/useAuthStore"

interface Props {
    messages: Message[]
}

function ChatHistory({ messages }: Props) {
    const { authUser } = useAuthStore()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="flex-1 max-h-100 overflow-y-auto p-8 space-y-10">
            {messages.map(message => {
                return (
                    <div
                        ref={messagesEndRef}
                        className={`flex 
                        ${message.senderId === authUser?._id
                                ? "justify-end -rotate-2 "
                                : "justify-start -rotate-2"}`}
                        key={message._id}>
                        <MessageBox
                            className={`${message.senderId === authUser?._id
                                ? "clip-polygon-in"
                                : "clip-polygon-out"
                                }`}
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