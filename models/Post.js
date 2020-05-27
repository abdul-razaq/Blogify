import dbConnection from '../configs/database'
import User from './User'

export default class Post {
	constructor(title, content, image_url, author_id, category) {
		this.title = title
		this.content = content
		this.image_url = image_url || null
		this.author_id = author_id
		this.category = category
		this.postId = null
		this.categoryId = null
	}

	async save() {
		try {
			const categoryQuery = 'INSERT INTO categories (category) VALUES (?);'
			const [rows, _] = await dbConnection.execute(categoryQuery, [
				this.category,
			])
			this.categoryId = rows.insertId
			const postQuery =
				'INSERT INTO posts (title, content, image_url, author_id, category_id) VALUES (?, ?, ?, ?, ?);'
			const [postRows, field] = await dbConnection.execute(postQuery, [
				this.title,
				this.content,
				this.image_url,
				this.author_id,
				this.categoryId,
      ])
			return postRows.insertId
		} catch (error) {
			throw error
		}
	}

	static async editPost(authorId, postId, title, content, image_url, category) {
		try {
			const [
				rows,
				_,
			] = await dbConnection.execute(
				'SELECT categories.id FROM categories WHERE categories.category = ?;',
				[category]
			)
			if (!rows[0]) {
				throw new Error('This category is not supported')
			}
			const query =
				'UPDATE posts SET edited = true, title = ?, content = ?, image_url = ?, category_id = ? WHERE posts.id = ? AND posts.author_id = ?;'
			return await dbConnection.execute(query, [
				title,
				content,
				image_url,
				rows[0].id,
				postId,
				authorId,
			])
		} catch (error) {
			throw error
		}
	}

	static async deletePost(authorId, postId) {
		try {
			const query =
				'DELETE FROM posts WHERE posts.author_id = ? AND posts.id = ?;'
			return await dbConnection.execute(query, [authorId, postId])
		} catch (error) {
			throw error
		}
	}

	static async getPost(postId) {
		try {
			const query =
				'SELECT posts.id, posts.title, posts.content, posts.edited, posts.created_on, posts.image_url, categories.category AS category FROM posts INNER JOIN categories ON posts.category_id = categories.id WHERE posts.id = ?;'
			const [post, _] = await dbConnection.execute(query, [postId])
			return post
		} catch (error) {
      throw error
    }
	}

	static async getAllPost(userId, limit) {
		try {
			const query =
				"SELECT posts.id, posts.title, posts.content, posts.edited, posts.created_on, posts.image_url, COUNT(posts.title) AS 'total posts', CONCAT(users.firstname, ' ', users.lastname) AS author, categories.category AS category FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN categories ON posts.category_id = categories.id WHERE users.id = ? ORDER BY posts.created_on ASC GROUP BY posts.title LIMIT ?;"
			const [posts, _] = dbConnection.execute(query, [userId, limit])
			return posts
		} catch (error) {
			throw error
		}
	}

	static async getFeeds(limit) {
		try {
			const query =
				"SELECT posts.id, posts.title, posts.content, posts.edited, posts.created_on, posts.image_url, CONCAT(users.firstname, ' ', users.lastname) AS author, COUNT(posts.title) AS 'total posts', categories.category AS category FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN categories ON posts.category_id = categories.id ORDER BY posts.created_on ASC GROUP BY posts.title LIMIT ?;"
			const [feeds, _] = dbConnection.execute(query, [limit])
			return feeds
		} catch (error) {
			throw error
		}
	}
}
