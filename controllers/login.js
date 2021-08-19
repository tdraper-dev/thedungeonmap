const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('LOGGING IN', body)
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  
  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or passowrd'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
      .status(200)
      .send({token, username: user.username, id: user._id})
})

module.exports = loginRouter;