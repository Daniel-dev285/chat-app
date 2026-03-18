import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { signupSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/signup', validate(signupSchema), AuthController.signup)

router.post('/login', validate(loginSchema), AuthController.login)

router.post('/logout', AuthController.logout)

router.put('/update-profile', protectRoute , AuthController.updateProfile)

router.get("/check", protectRoute, AuthController.checkAuth)

export default router



