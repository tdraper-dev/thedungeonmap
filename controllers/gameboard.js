const gameBoardRouter = require('express').Router()
const Gameboard = require('../models/Gameboard')
const Icon = require('../models/Icon')
const middleware = require('../utils/middleware')
const User = require('../models/User')
const multer = require('multer')
const helperFunctions = require('../utils/helperFunctions')


gameBoardRouter.get('/', middleware.userExtractor, async (request, response) => {
  let gameBoards = [];
    if(request.user){
      gameBoards = await Gameboard.find({user: request.user._id}, {
        board: 1,
        date: 1,
        user: 1,
        dashImage: 1,
        thumbnail: 1,
        icons: 1
      }).populate('icons')
    }
    response.json(gameBoards)
})

gameBoardRouter.get('/:id', async(request, response) => {
  const gameBoard = await Gameboard.findById(request.params.id, {
    board: 1,
    user: 1,
    icons: 1,
    image: 1
  }).populate('icons')

  response.json(gameBoard)
})

gameBoardRouter.post('/', middleware.userExtractor, multer({storage: multer.memoryStorage()}).single("myImage"), async(request, response) => {
  const file = request.file
  const boardName = request.body.title
  const imageBuffers = await helperFunctions.imageProcessing(file)

  console.log('TYPE OF USER ID', typeof request.user._id)
  const newGameBoard = new Gameboard({
    board: boardName,
    date: new Date(),
    user: request.user._id,
    image: imageBuffers.img,
    dashImage: imageBuffers.dashBuffer,
    thumbnail: imageBuffers.thumbnail
  })
  
  const savedBoard = await newGameBoard.save()
  request.user.gameboards = request.user.gameboards.concat(savedBoard._id)
  await request.user.save()

  const boardPkg = {
    board: savedBoard.board,
    user: savedBoard.user,
    icons: savedBoard.icons,
    dashImage: savedBoard.dashImage,
    thumbnail: savedBoard.thumbnail,
    id: savedBoard._id
  }

  response.json(boardPkg)
})

gameBoardRouter.put('/:id', multer({storage: multer.memoryStorage()}).single("myImage"), async(request, response) => {
  try {
    const file = request.file;
    const builtImage = await helperFunctions.imageProcessing(file);
    await Gameboard.findByIdAndUpdate(request.params.id,{
      image: builtImage.img,
      dashImage: builtImage.dashBuffer,
      thumbnail: builtImage.thumbnail
    })
    response.json(builtImage.img)
  } catch(exception) {
    console.log('FAILURE IN UPDATING IMAGE', exception)
  }
})

gameBoardRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
  const boards = await Gameboard.find({  user: request.user._id })
  let boardToDelete;

  const boardsToKeep = boards.filter( board => {
    if(board._id.toString() === request.params.id) { 
      boardToDelete = board 
    }
    return board._id.toString() !== request.params.id
  })

  if (boardToDelete.user.toString() === request.user._id.toString()) {
    await Gameboard.deleteOne( {_id: request.params.id} )
    await Icon.deleteMany({ gameBoard: boardToDelete._id })

    const user = await User.findById(request.user._id)
    user.gameboards = boardsToKeep;
    user.save()
    
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Invalid token. Only original creator may delete board'})
  }
})



module.exports = gameBoardRouter