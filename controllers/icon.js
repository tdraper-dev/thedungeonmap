const iconRouter = require('express').Router()
const Gameboard = require('../models/Gameboard')
const Icon = require('../models/Icon')


iconRouter.get('/', async(request, response) => {
  const icons = await Icon.find({}).populate('gameBoard', { board: 1 })
  response.json(icons);
})

iconRouter.get('/:id', async(request, response) => {
  const boardId = request.params.id

  
})

iconRouter.post('/', async(request, response) => {
  const body = request.body
  console.log('LET US CHECK OUT THIS BODY: ', body)
  const gameBoard = await Gameboard.findById(body.boardId)

  const newIcon = new Icon({
    content: body.content,
    color: body.color || 'antiquewhite',
    gameBoard: gameBoard._id,
    position: {
      x: '0%',
      y: '0%'
    }
  })
  console.log('NEWICON', newIcon)
  const savedIcon = await newIcon.save()
  gameBoard.icons = gameBoard.icons.concat(savedIcon._id)
  await gameBoard.save()

  response.json(savedIcon)
})

iconRouter.put('/:id', async(request, response) => {
  const body = request.body
  const icon = await Icon.findByIdAndUpdate(request.params.id, { 
    position: { 
      x: body.x, 
      y: body.y 
    } 
  })
  response.json(icon)
})

iconRouter.delete('/:id', async(request, response) => {
  const icon = await Icon.findByIdAndDelete(request.params.id)
  response.status(204).send(icon)
})



module.exports = iconRouter