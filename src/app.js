import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import dotenv from 'dotenv'

import swaggerDocument from '../swagger.json'
import createTables from './configs/migrations'
import Errors from './helpers/Errors/Errors'
import authRoutes from './routes/users'
import postsRoutes from './routes/posts'

dotenv.config()

const PORT = process.env.PORT || 5000

const basePath = '/api/v1'

const options = {
	explorer: true,
}

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options))

app.use(`${basePath}/auth`, authRoutes)
app.use(`${basePath}/posts`, postsRoutes)

app.use(Errors.error404)
app.use(Errors.generalError)

createTables()
	.then(() => {
		console.log(chalk.green.bold('Migrations completed successfully!'))
		app.listen(PORT, () => {
			console.log(chalk.blue.bold(`Server started on port ${PORT}`))
		})
	})
	.catch(() => {
		console.log(chalk.red.bold('Error performing migrations'))
	})
