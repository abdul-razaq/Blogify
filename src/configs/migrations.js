import dbConnection from '../configs/database'
import {
	usersTable,
	postsTable,
	commentsTable,
	likesTable,
	categoriesTable,
	tokensTable,
} from './queries'

const createTables = () => {
	try {
		return Promise.all([
			dbConnection.query('USE blogify;'),
			dbConnection.execute(usersTable),
			dbConnection.execute(categoriesTable),
			dbConnection.execute(postsTable),
			dbConnection.execute(commentsTable),
			dbConnection.execute(likesTable),
			dbConnection.execute(tokensTable),
		])
	} catch (error) {
		return Promise.reject(error)
	}
}

export default createTables
