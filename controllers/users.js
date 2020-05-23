import argon2 from 'argon2'
import User from '../models/User'
import { successResponse, errorResponse } from '../helpers/responses'
import AppError from '../helpers/Errors/AppError'
import Errors from '../helpers/Errors/Errors'


export default {
	signUp: async (req, res, next) => {
		Errors.sendValidationError(req, next)
		try {
			const {
				firstname,
				lastname,
				email,
				password,
				profile_url,
				gender,
				bio,
			} = req.body
			const user = new User(
				firstname,
				lastname,
				email,
				gender,
				password,
				profile_url,
				bio
			)
			const userId = await user.save()
			const token = await User.generateToken(userId, email)
			const data = { token, userId }
			successResponse(201, 'User Account successfully created!', data)
		} catch (error) {
			errorResponse(error, next)
		}
	},

	login: async (req, res, next) => {
		Errors.sendValidationError(req, next)
		try {
			const user = await User.findUser(null, req.body.email)
			if (!user || !(await argon2.verify(user.password, req.body.password))) {
				throw new AppError(401, 'Unable to login user, check your credentials!')
			}
			const { id, firstname, lastname, email } = user
			const token = await User.generateToken(id, email)
			const data = { id, firstname, lastname, email, token }
			successResponse(res, 200, 'User logged in successfully', data)
		} catch (error) {
			errorResponse(error, next)
		}
	},

	logout: async (req, res, next) => {
	},
}
