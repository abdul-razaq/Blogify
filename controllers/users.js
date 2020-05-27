import argon2 from 'argon2'

import User from '../models/User'
import AppError from '../helpers/Errors/AppError'
import Errors from '../helpers/Errors/Errors'
import { successResponse, errorResponse } from '../helpers/responses'

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
			const exists = await User.findUser(null, email)
			if (exists) {
				throw new AppError(406, 'Email address already taken!')
			}
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
			successResponse(res, 201, 'User Account successfully created!', data)
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
		try {
			await User.removeToken(req.token, req.userId)
			successResponse(res, 200, 'User logged out successfully')
		} catch (error) {
			errorResponse(error, next)
		}
	},

	updatePassword: async (req, res, next) => {
		try {
			const old_password = req.body.old_password
			const user = await User.findUser(req.userId, req.email)
			if (!(await argon2.verify(user.password, old_password))) {
				throw new AppError(403, 'Please provide correct old password!')
			}
			await User.changePassword(req.userId, req.body.new_password)
			successResponse(res, 201, 'Password updated successfully')
		} catch (error) {
			errorResponse(error, next)
		}
	},

	getProfile: async (req, res, next) => {
		try {
			const {
				firstname,
				lastname,
				email,
				profile_url,
				gender,
				date_joined,
				bio,
			} = await User.findUser(req.userId, req.email)
			const profile = { firstname, lastname, email, profile_url, gender, date_joined, bio }
			successResponse(res, 200, 'User profile details!', profile)
		} catch (error) {
			errorResponse(error, next)
		}
	},

	updateProfile: async (req, res, next) => {
		Errors.sendValidationError(req, next)
		try {
			const { firstname, lastname, email, profile_url, gender, bio } = req.body
			const exists = await User.findUser(null, email)
			if (exists) {
				throw new AppError(406, 'Email address already taken!')
			}
			await User.updateProfile(req.userId, firstname, lastname, email, profile_url, gender, bio)
			successResponse(res, 201, 'Profile updated successfully')
		} catch (error) {
			errorResponse(error, next)
		}
	},

	deleteUser: async (req, res, next) => {
		try {
			await User.deleteUser(req.userId, req.email)
			await User.removeToken(req.token, req.userId)
			successResponse(res, 200, 'User successfully deleted')
		} catch (error) {
			errorResponse(error, next)
		}
	}
}
