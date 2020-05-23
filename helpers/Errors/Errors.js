import { validationResult } from 'express-validator'

export default {
	generalError: (error, req, res, next) => {
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
			const error = new Error('Input validation failed! check input values')
			error.status = 406
			error.data = errors.array().map(error => error.msg)
			return next(error)
		}
	}
}
