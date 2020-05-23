export const successResponse = (res, status, message, data = undefined) => {
	return res.status(status).json({
		status: 'success',
		data: {
			message,
			data,
		},
	})
}

export const errorResponse = (error, next) => {
	if (!error.status && !error.message && !error.data) {
		error.status = 500
		error.message = 'Internal server error!'
		error.data = undefined
	}
	return next(error)
}
