import express from 'express'

import { signupValidator, loginValidator } from '../configs/validations'
import authenticate from '../middlewares/authenticate'
import authController from '../controllers/users'

const router = express.Router()

router.post('/signup', signupValidator, authController.signUp)
router.post('/login', loginValidator, authController.login)
router.post('/logout', authenticate, authController.logout)

export default router
