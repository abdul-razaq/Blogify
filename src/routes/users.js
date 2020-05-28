import express from 'express'

import {
	signupValidator,
	loginValidator,
	passwordValidator,
	profileUpdateValidator,
} from '../configs/validations'
import authenticate from '../middlewares/authenticate'
import authController from '../controllers/users'
import uploads from '../configs/multer'

const router = express.Router()

router.post(
	'/signup',
	uploads.single('profile_url'),
	signupValidator,
	authController.signUp
)
router.post('/login', loginValidator, authController.login)
router.post('/logout', authenticate, authController.logout)
router.patch(
	'/password/update',
	authenticate,
	passwordValidator,
	authController.updatePassword
)

router.get('/user/profile', authenticate, authController.getProfile)
router.patch(
	'/user/profile/edit',
	authenticate,
	uploads.single('profile_url'),
	profileUpdateValidator,
	authController.updateProfile
)
router.delete('/user/delete', authenticate, authController.deleteUser)

export default router
