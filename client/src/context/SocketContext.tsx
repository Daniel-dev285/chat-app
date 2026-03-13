import { createContext, useEffect } from "react";
import { socket } from "../socket/socket"

interface SocketProviderProps {
    children: React.ReactNode
}

export const SocketContext = createContext(socket)

export const SocketProvider = ({ children } : SocketProviderProps) => {

    useEffect(() => {
        socket.connect()

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}