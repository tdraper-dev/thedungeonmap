const config = require('./utils/config')
const express = require('express')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const path = require('path');
const app = express()
require('express-async-errors')
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})
const gameBoardRouter = require('./controllers/gameboard')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const iconRouter = require('./controllers/icon')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const rootRouter = express.Router()

app.use(cors())

app.use(express.json())
app.use(mongoSanitize())
app.use(helmet())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
const buildPath = path.normalize(path.join(__dirname, 'build'))
app.use(express.static(path.normalize(path.join(__dirname, 'build'))));

app.use('/api/gameboards', gameBoardRouter)
app.use('/api/icons', iconRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

io.on('connection', socketManager)

rootRouter.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.use(rootRouter)

app.use(middleware.errorHandler)

function socketManager(socket){
  let socketRoom;
  let user;
  console.log('YOU"VE CONNECTED')

  socket.on('join', ({boardId, username='User'}) => {
    console.log('Joining room: ', boardId)
    socket.join(boardId)
    
    socketRoom=boardId;
    user = username;

    socket.to(boardId).emit('receive_message', {
      id: Math.random(),
      content: `${username} has joined the game`,
      systemMsg: true
    })
  })

  socket.on('guest', (room) => {
    console.log('Guest wants to join room: ', room);

    if(io.of('/').adapter.rooms.has(room)) {
      socket.emit('guestCheck', true)
    } else {
      socket.emit('guestCheck', false)
    }
    
  })

  socket.on('create_icon', (data) => {
    console.log('Server says someone wants a new Icon')
    socket.to(socketRoom).emit('add_icon', data)
  })

  socket.on('move_icon', (data) => {
    console.log('SOMEONE MOVED AN ICON!!!!!!!!!!!!!!!!!!!!!')
    socket.to(socketRoom).emit('icon_updated', data)
  })

  socket.on('delete_icon', (data) => {
    socket.to(socketRoom).emit('clear_icon', data)
  })

  socket.on('change_map', () => {
    socket.to(socketRoom).emit('update_map')
  })

  socket.on('send_message', (message) => {
    console.log('server received a message!!!!!')
    socket.to(socketRoom).emit('receive_message', message)
  })

  socket.on('dm_disconnecting', () => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!THE SERVER SAYS THE DM IS DISCONNECTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    socket.to(socketRoom).emit('dm_disconnect');
    socket.disconnect();
  })

  socket.on('disconnect', () => {
    socket.to(socketRoom).emit('receive_message', {
      id: Math.random(),
      content: `${user} has left the game`,
      systemMsg: true
    })
    socket.disconnect()
  })
 
};

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})