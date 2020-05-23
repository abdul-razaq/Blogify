import dbConnection from '../configs/database'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

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

	static async deleteUser(userId, email) {
		const query = 'DELETE FROM users WHERE id = ? OR email = ?'
		return await dbConnection.execute(query, [userId, email])
	}
}
