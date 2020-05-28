import { validationResult } from 'express-validator'
import AppError from '../Errors/AppError'

export default {
	generalError: (error, req, res, next) => {
		if (!error.status && error.message) {
			error.status = 500
			error.message = 'Internal server error'
		}
		return res.status(error.status).json({
			status: 'error',
			message: error.message,
			errorData: error.data ? error.data : undefined
		})
	},

	error404: (req, res, next) => {
		return res.status(404).json({
			status: 'error',
			message: 'Not found!',
		})
	},

	sendValidationError: (req, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const data = errors.array().map(error => error.msg)
			const error = new AppError(406, 'Input validation failed! check input values', data)
			return next(error)
		}
	}
}
