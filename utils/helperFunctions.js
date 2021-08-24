const Image = require('../models/Image')
const sharp = require('sharp')
const Gameboard = require('../models/Gameboard')


const imageResizer = async (bufferArray, ratio) => {
  const metaInfo = await sharp(bufferArray).metadata()
  console.log('THIS IS THE METAINFO', metaInfo)
  const finalRatio = metaInfo.size > 10000000 ? ratio : 1;
  const scaledImage = await sharp(bufferArray)
      .resize({ height: 900 })
      .toBuffer({ resolveWithObject: true })

  return scaledImage
}

const thumbnailSizer = async (bufferArray) => {
  const thumbnailImage = await sharp(bufferArray)
    .resize({ width: 100, height: 100 })
    .toBuffer({ resolveWithObject: true })
  return thumbnailImage
}

const imageBuilder = ({ file, buffer={data:null}, thumbnailBuffer, dashBuffer }) => {
  return new Image({
    name: file.originalname,
    fileType: file.mimetype,
    img: buffer.data || file.buffer,
    thumbnail: thumbnailBuffer.data,
    dashBuffer: dashBuffer.data
  })
}

const imageProcessing = async(file) => {
  try {
    const thumbnailBuffer = await thumbnailSizer(file.buffer)
    const dashBuffer = await imageResizer(file.buffer, 0.3)
    if(file.size > 10000000) {
      const buffer = await imageResizer(file.buffer, 0.5)
      const newImage = imageBuilder({ file, buffer, thumbnailBuffer, dashBuffer });
      return newImage
    } else {
      const newImage = imageBuilder({ file, thumbnailBuffer, dashBuffer });
      return newImage
    }
  } catch (exception) {
    console.log(exception)
  }
}

module.exports = {
  imageResizer,
  imageBuilder,
  imageProcessing
}