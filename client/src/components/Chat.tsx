import { useEffect, useState, useRef } from "react"
import { useSocket } from "../hooks/useSocket"
import SendIco  from "../icons/SendIco"

export function Chat() {
    const socket = useSocket()
    const [messages, setMessages] = useState<string[]>([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        socket.on('message', (message: string, serverOffset: number) => {
            console.log('Received messages:', message)
            setMessages(prevMessages => [...prevMessages, message])
            socket.auth.serverOffset = serverOffset
        })


        return () => {
            socket.off('message')
        }
    }, [socket])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!input.trim()) return
        socket.emit('message', input)
        setInput('')
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
            <section className="h-120 w-full overflow-y-auto flex items-end-safe flex-col px-5">
                {messages.map((message, index) => (
                    <div
                        ref={messagesEndRef}
                        className="bg-accent mb-1.5 px-4 py-1 rounded-lg"
                        key={index}>
                        {message}
                    </div>
                ))}
            </section>

            
                <form
                    className="flex justify-between mx-auto sm:w-2/4 gap-2 rounded-lg bg-primary py-1"
                    onSubmit={sendMessage}>
                    <input
                        className="rounded py-2 px-4 outline-none w-full"
                        placeholder="Write a message..."
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {input && 
                    <button className="rounded cursor-pointer text-white py-2 px-4 ">
                        <SendIco className="size-6 text-accent" />
                    </button>
                    }
                </form>
        </div>
    )
}

export default Chat
