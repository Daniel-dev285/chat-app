import logger from 'morgan'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import { app, server } from './lib/socket.js'


dotenv.config()

const PORT = process.env.PORT ?? 3000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', "PUT", "DELETE"],
    credentials: true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
    connectDB()
})
