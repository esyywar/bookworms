const express = require('express')
const connectDB = require('./config/db')

const app = express()

/* Connect MongoDB database */
connectDB()

/* Init middleware */
app.use(express.json())

/* Set port as production server or 5000 for development */
const PORT = process.env.PORT || 5000

/* Get at root index */
app.get('/', (req, res) => res.send('API running'))

/* Setting up API routes */
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
