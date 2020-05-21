import dbConnection from '../configs/database'
import {
	usersTable,
	postsTable,
	commentsTable,
	likesTable,
	categoriesTable,
	tokensTable,
} from './queries'

const createTables = async () => {
	try {
		// await dbConnection.query('CREATE DATABASE IF NOT EXISTS blogify;')
		await dbConnection.query('USE blogify;')
		await dbConnection.execute(usersTable)
		await dbConnection.execute(categoriesTable)
		await dbConnection.execute(postsTable)
		await dbConnection.execute(commentsTable)
		await dbConnection.execute(likesTable)
    await dbConnection.execute(tokensTable)
    // await dbConnection.execute('INSERT INTO users (firstname, lastname, email, password, gender, bio) VALUES (?, ?, ?, ?, ?, ?)', ['Aisha', 'Suleiman', 'aisha@gmail.com', 'aishaspassword', 'F', 'I am the super admin'])
		return Promise.resolve()
	} catch (error) {
		return Promise.reject(error)
	}
}

export default createTables
