import { Server } from 'socket.io'
import { createServer } from 'node:http'
import express from 'express'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST' , 'PUT', 'DELETE']
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true
    }
})

export function getReceiverId(userId) {
    return userSocketMap[userId]
}

const userSocketMap = {}

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('a user has connected')

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

export { io, server, app}