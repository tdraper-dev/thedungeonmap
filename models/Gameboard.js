const mongoose = require('mongoose')

const gameBoardSchema = new mongoose.Schema({
  board : {
    type: String,
    validate: {
      validator: function(name) {
        const check = /(\$|{|}|\/|\\|\*|\(|\)\`)+/g.test(name)
        return check ? false : true
      } 
    },
    required: true,
    minlength: 1
  },
  boardPath: {
    type: String,
    validate: {
      validator: function(name) {
        const check = /(\$|{|}|\/|\\|\*|\(|\)\`)+/g.test(name)
        return check ? false : true
      }
    },
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: Buffer,
  dashImage: Buffer,
  thumbnail: Buffer,
  icons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Icon'
    }
  ]
})

gameBoardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Gameboard', gameBoardSchema)