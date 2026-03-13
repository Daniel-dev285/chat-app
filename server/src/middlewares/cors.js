import cors from 'cors'

const ALLOWED_ORIGINS = ['http://localhost:5173']

export const corsMiddleware = ({ allowOrigins = ALLOWED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (allowOrigins.includes(origin) || !origin) {
            return callback(null, true)
        }
        
        return callback(new Error('Not allowed by CORS'))
    }
})
