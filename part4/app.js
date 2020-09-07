const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/bloglist')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => logger.info("connected to mongodb"))
.catch( (error) => logger.error("error in connection", error.message))

const app = express()

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/', blogRouter)
app.use(middleware.unknownendpoint)
app.use(middleware.errorHandler)

module.exports = app