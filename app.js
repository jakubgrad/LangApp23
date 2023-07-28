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
const Blog = require('./models/blog')
app.use(express.static('build')) //added this to integrate frontend from 3.22. This is the only line connecting directly the frotend to the original 4.12
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

//const mongoUrl = 'mongodb://localhost/bloglist'
//const mongoUrl = process.env.MONGODB_URI
//const mongoUrl = 'mongodb+srv://fullstack:merc1234@firstcluster.o20unys.mongodb.net/?retryWrites=true&w=majority'
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
//app.use('/build', notesRouter) //added to make the frontend from 3.22 work 24.07 

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
