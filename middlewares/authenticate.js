import jwt from 'jsonwebtoken'

import User from '../models/User'
import { errorResponse } from '../helpers/responses'
import AppError from '../helpers/Errors/AppError'

export default async (req, res, next) => {
	try {
		const authHeader = req.get('authorization')
		const token = authHeader.split(' ')[1]
		if (!authHeader || typeof token === 'undefined') {
			throw new AppError('401', 'Please authenticate!')
		}
		const { id, email } = jwt.verify(token, process.env.JWT_SECRET)
		const userExists = await User.findUserWithToken(id, email, token)
		if (!userExists)
			throw new AppError('401', 'Invalid token, Please authenticate!')
		req.userId = id
		req.email = email
		req.token = token
		next()
	} catch (error) {
		errorResponse(error, next)
	}
}
