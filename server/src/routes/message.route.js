import { Router } from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { MessageController } from '../controllers/message.controller.js'

const router = Router()

router.get("/users", protectRoute, MessageController.getUsers)
router.get("/:id", protectRoute, MessageController.getMessages)

router.post("/send/:id", protectRoute, MessageController.sendMessage)

export default router