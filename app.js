const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
//console.log("Config port ", config.PORT);
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
//const blogsRouter = require('./models/blog')
const mongoose = require('mongoose')
const path = require('path') // Make sure you have this line
app.use(express.static('build')) //added this to integrate frontend from 3.22. This is the only line connecting directly the frotend to the original 4.12
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
mongoose.connect(mongoUrl)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', notesRouter) 

//frontend catch-all route
app.get('/frontend/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
