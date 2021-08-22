const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mongoSanitize = require('express-mongo-sanitize')
/*
validate: {
  validator: function(username) {
    /*const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
      '`': '&grave;'
    };
    const reg = /[&<>"'/`]/ig;
    const newUser = username.replace(reg, (match)=>(map[match]));
    return /[a-zA-Z0-9_]/.test(newUser)
    console.log('YO WHATUP')
    console.log(mongoSanitize.has(username))
    return !mongoSanitize.has(username)
  }
  */

const requestLogger = (request, response, next) => {
  console.log('This is bad!', mongoSanitize.has(request.body))
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  request.token = null

  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  request.user = null
  let decodedToken;
  
  if(request.token) {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken ||!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid '})
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  }


  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
          error: 'invalid token'
      })
  } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
          error: 'token expired'
      })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  errorHandler
}