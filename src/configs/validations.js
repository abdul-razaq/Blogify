import { body } from 'express-validator'

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
		.withMessage('Enter a valid email address'),
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

export const passwordValidator = [
	body('old_password', 'supply old password')
		.trim()
		.isAlphanumeric()
		.withMessage('password must be alphanumeric')
		.isLength({ min: 8 })
		.withMessage('password must be 8 characters or more'),

	body('new_password', 'supply new password')
		.trim()
		.isAlphanumeric()
		.withMessage('password must be alphanumeric')
		.isLength({ min: 8 })
		.withMessage('password must be 8 characters or more'),

	body('confirm_new_password', 'please confirm new password')
		.custom((value, { req }) => {
			return value === req.body.new_password
		})
		.withMessage('passwords have to match'),
]

export const profileUpdateValidator = [
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
		.withMessage('Enter a valid email address'),
	body('gender', 'gender is required').trim().isLength({ min: 1, max: 1 }),
]

const postCategories = [
	'Tech',
	'Misc',
	'Education',
	'Politics',
	'Religion',
	'Health',
	'Fashion'
]

export const newPostValidator = [
	body('title', 'post title is required')
		.trim()
		.isLength({ min: 5, max: 100 })
		.withMessage('title must be between 5 and 100'),
	body('content', 'post content is required')
		.trim()
		.isLength({ min: 10, max: 255 })
		.withMessage('post content must be between 10 and 255'),
	body('category', 'post category is required')
		.trim()
		.isLength({ min: 3, max: 10 })
		.withMessage('post category must be between 3 and 10')
		.custom((value, { req }) => {
			return postCategories.includes(value)
		}).withMessage('This category does not exist'),
]
