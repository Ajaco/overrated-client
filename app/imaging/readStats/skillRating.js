import jimp from 'jimp'
import regions from '../regions'
import readImage from '../readImage'

export default async function (img) {
  const {
    sr: {
      rect: {x, y, w, h}
    }
  } = regions

  const buffer = await img
    .clone()
    .crop(x, y, w, h)
    .getBufferAsync(jimp.MIME_PNG)
  const text = await readImage(buffer)

  return parseInt(text.trim(), 10)
}
