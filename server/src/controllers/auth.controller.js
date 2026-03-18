import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

export class AuthController {
    static async signup(req, res) {
        const { fullName, email, password } = req.body
        try {
            // check if email already exists
            const user = await User.findOne({ email })
            if (user) return res.status(409).json({ message: "Email already exists" })

            // hashing the password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // creates mongoose document
            const newUser = new User({
                fullName,
                email,
                password: hashedPassword
            })

            // generate jwt token
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            })

        } catch (error) {
            console.log("Error in signup controller", error.message)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) return res.status(401).json({ message: "Invalid credentials" })

            const isPwdValid = await bcrypt.compare(password, user.password)
            if (!isPwdValid) return res.status(400).json({ message: "Invalid credentials" })

            generateToken(user._id, res)

            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            })
        } catch (error) {
            console.log("Error in login controller", error.message)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static logout(req, res) {
        try {
            res.clearCookie("jwt")
            res.status(200).json({ message: "Logged out successfully" })
        } catch (error) {
            console.log("Error in logout controller", error.message)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async updateProfile(req, res) {
        try {
            const { profilePic } = req.body
            const userId = req.user._id

            if (!profilePic) {
                return res.status(400).json({ message: "Profile pic is required" })
            }

            // uploads image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(profilePic)
            const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

            res.status(200).json(updatedUser)
        } catch (error) {
            console.log("error in update profile", error.message)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static checkAuth(req, res) {
        try {
            res.status(200).json(req.user)
        } catch (error) {
            console.log("Error in checkAuth controller", error.message)
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}