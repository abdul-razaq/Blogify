import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import cors from 'cors'

import createTables from './configs/migrations'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res, next) => {
	res.send('Welcome to blogify API!')
})
// API Routes

createTables()
	.then(() => {
		console.log(chalk.green.bold('Migrations completed successfully!'))
		app.listen(PORT, () => {
			console.log(chalk.blue.bold('Server started on port 5000'))
		})
	})
	.catch((err) => {
    console.log(err)
		console.log(chalk.red.bold('Migration did not finish successfully'))
	})
