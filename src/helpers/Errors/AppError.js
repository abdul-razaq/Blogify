export default class AppError extends Error {
	constructor(status, message, data) {
		super(message);
		this.status = status;
		this.data = data;
	}
}
