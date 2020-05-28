export default class AppError extends Error {
	constructor(status, message, data = undefined) {
		super()
		this.status = status
		this.message = message
		this.data = data
	}
}
