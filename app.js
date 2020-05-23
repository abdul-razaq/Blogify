import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import cors from 'cors'

import createTables from './configs/migrations'
import authRoutes from './routes/users'
import Errors from './helpers/Errors/Errors'

const PORT = process.env.PORT || 5000

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
	res.send('Welcome to blogify API!')
})

app.use('/v1/api/auth', authRoutes)

app.use(Errors.error404)
app.use(Errors.generalError)

createTables()
	.then(() => {
		console.log(chalk.green.bold('Migrations completed successfully!'))
		app.listen(PORT, () => {
			console.log(chalk.blue.bold('Server started on port 5000'))
		})
	})
	.catch(() => {
		console.log(chalk.red.bold('Unable to finish migrations'))
	})
