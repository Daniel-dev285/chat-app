import logger from 'morgan'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { connectDB } from './lib/db.js'

dotenv.config()

const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true
    }
})

// Socket.IO connection handler
// io.on('connection', async (socket) => {
//     console.log('a user has connected')

//     socket.on('disconnect', () => {
//         console.log('a user has disconnected')
//     })

//     socket.on('message', async (message) => {
//         let result 
//         try {
//             result = await db.execute({
//                 sql: 'INSERT INTO messages (content) VALUES (:content)',
//                 args: { content: message }
//             })
//         } catch (error) {
//             console.error('Error saving message to database:', error)
//             return 
//         }
//         console.log('Received message:', message)
//         // Broadcast the message to all connected clients
//         io.emit('message', message, result.lastInsertRowid.toString())
//     })

//     if (!socket.recovered) {
//         console.log('New connection, sending message history')
//         try {
//             const results = await db.execute({
//                 sql: 'SELECT * FROM messages WHERE id > ?',
//                 args: [socket.handshake.auth.serverOffset ?? 0]
//             })

//             results.rows.forEach(row => {
//                 socket.emit('message', row.content, row.id.toString())
//             })
//         } catch (error) {
//             console.error('Error fetching message history:', error)
//         }
//     }
// })

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', "PUT", "DELETE"],
    credentials: true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
    connectDB() 
})
