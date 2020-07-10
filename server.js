const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

/* Connect MongoDB database */
connectDB()

/* Init middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

/* Setting up API routes */
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))

/* If in production, set static folder to client index.html */
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

/* Set port as production server or 5000 for development */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
