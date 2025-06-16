import { registerUser, login, getProfile } from "../controllers/authController.js"
import express from 'express'
import { verifyToken } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.get('/profile', verifyToken, getProfile)

export default router;