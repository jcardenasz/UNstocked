import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.middlewares'
import authController from '../controllers/auth.controller'

const router = Router()
// Return es promesa de objeto, y debe ser void
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/profile', authRequired, authController.profile)

export default router
