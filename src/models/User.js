import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import dbConnection from '../configs/database'

export default class User {
	constructor(
		firstname,
		lastname,
		email,
		gender,
		password,
		profile_url = null,
		bio = null
	) {
		this.firstname = firstname
		this.lastname = lastname
		this.email = email
		this.password = password
		this.profile_url = profile_url
		this.gender = gender
		this.bio = bio
		this.userId = null
	}

	async save() {
		try {
			const query =
				'INSERT INTO users (firstname, lastname, email, password, profile_url, gender, bio) VALUES (?, ?, ?, ?, ?, ?, ?)'
			this.password = await argon2.hash(this.password)
			const values = [
				this.firstname,
				this.lastname,
				this.email,
				this.password,
				this.profile_url,
				this.gender,
				this.bio,
			]
			const [rows, _] = await dbConnection.execute(query, values)
			this.userId = rows.insertId
			return this.userId
		} catch (error) {
			throw error
		}
	}

	static async generateToken(id, email) {
		const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
			expiresIn: '24h',
		})
		const query = 'INSERT INTO tokens (token, user_id) VALUES (?, ?)'
		const values = [token, id]
		await dbConnection.execute(query, values)
		return token
	}

	static async findUser(userId, email) {
		const query =
			'SELECT id, firstname, lastname, email, password, profile_url, gender, date_joined, bio FROM users WHERE id = ? OR email = ?'
		const [rows, _] = await dbConnection.execute(query, [userId, email])
		return rows[0]
	}

	static async findUserWithToken(userId, email, token) {
		const query =
			'SELECT users.id, users.firstname, users.lastname, users.email FROM users INNER JOIN tokens ON users.id = ? AND users.email = ? AND tokens.token = ?'
		const [rows, _] = await dbConnection.execute(query, [userId, email, token])
		return rows[0]
	}

	static async deleteUser(userId, email) {
		const query = 'DELETE FROM users WHERE users.id = ? AND users.email = ?'
		return await dbConnection.execute(query, [userId, email])
	}

	static async removeToken(token, id) {
		const query = 'DELETE FROM tokens WHERE token = ? AND user_id = ?'
		return await dbConnection.execute(query, [token, id])
	}

	static async changePassword(user_id, new_password) {
		try {
			const hashed_password = await argon2.hash(new_password)
			const query = 'UPDATE users SET password = ? WHERE users.id = ?'
			return await dbConnection.execute(query, [hashed_password, user_id])
		} catch (error) {
			throw error
		}
	}

	static async updateProfile(user_id, firstname, lastname, email, profile_url, gender, bio) {
		const user = await User.findUser(user_id, null)
		const query = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, profile_url = ?, gender = ?, bio = ? WHERE users.id = ?'
		return await dbConnection.execute(query, [firstname, lastname, email, profile_url || user.profile_url, gender, bio || user.bio, user_id])
	}
}
