const mongoose = require('mongoose')

const iconSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  color: String,
  gameBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gameboard',
    required: true
  },
  position: {
    x: { type: String },
    y: { type: String }
  }
})

iconSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__V
  }
})

module.exports = mongoose.model('Icon', iconSchema )