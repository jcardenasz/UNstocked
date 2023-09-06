import { Router } from 'express'
import authController from '../controllers/auth.controller'

const router = Router()
// Return es promesa de objeto, y debe ser void
router.post('/register', authController.register)
router.post('/login', authController.login)
// No funciona, se queda pensando
router.post('/logout', authController.logout)

export default router
