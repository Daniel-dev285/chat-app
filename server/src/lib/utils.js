import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // only accessible by the server
        sameSite: "strict", // prevent CSRF
        secure: process.env.NODE_ENV === "production" // only send cookie over HTTPS in production
    })

    return token
}