const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  fileType: String,
  img: Buffer,
  thumbnail: Buffer,
  dashBuffer: Buffer
});

imageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = new mongoose.model('Image', imageSchema)