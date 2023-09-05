import { Router } from 'express'
import authController from '../controllers/auth.controller'

const router = Router()
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', authController.register)
// router.post('/login', login)
// router.post('/logout', logout)

export default router
