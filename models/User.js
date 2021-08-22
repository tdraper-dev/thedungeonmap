const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    validate: {
      validator: function(username) {
        const check = /(\$|{|}|\/|\\|\*|\(|\)\`)+/g.test(username)
        return check ? false : true
      }
    },
    unique: true,
    minlength: 5
  },
  passwordHash : {
    type: String,
    required: true
  },
  gameboards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Gameboard'
    }
  ]
})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)