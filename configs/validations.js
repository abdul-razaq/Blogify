import { body } from 'express-validator'
import User from '../models/User'

const emailExists = async email => {
	const result = await User.findUser(null, email)
	if (result) return false
}

export const signupValidator = [
	body('firstname', 'firstname is required')
		.trim()
		.isLength({ min: 5 })
		.withMessage('firstname must be 5 characters or more'),
	body('lastname', 'lastname is required')
		.trim()
		.isLength({ min: 5 })
		.withMessage('lastname must be 5 characters or more'),
	body('email', 'email address is required')
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage('Enter a valid email address')
		.custom((value, { req }) => {
			emailExists(value)
		})
		.withMessage('Email address already taken'),
	body('gender', 'gender is required').trim().isLength({ min: 1, max: 1 }),
	body('password', 'password is required')
		.trim()
		.isAlphanumeric()
		.withMessage('password must be alphanumeric')
		.isLength({ min: 8 })
		.withMessage('password must be 8 characters or more'),
	body('confirm_password', 'please confirm password')
		.trim()
		.custom((value, { req }) => {
			return value === req.body.password
		})
		.withMessage('passwords do not match'),
]

export const loginValidator = [
	body('email', 'email address is required')
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage('Enter a valid email address'),
	body('password', 'password is required')
		.trim()
		.isAlphanumeric()
		.withMessage('password must be alphanumeric')
		.isLength({ min: 8 })
		.withMessage('password must be 8 characters or more'),
]
