const logger = require('../utils/logger')

const requestLogger = function(req, res, next){
    logger.info('##########')
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('##########')
    next()
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer')) {
        req.token = auth.substring(7)
        next()
        return
    }
    req.token = null
    next()
}

const unknownendpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownendpoint,
    errorHandler
}