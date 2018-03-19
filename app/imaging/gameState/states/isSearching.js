import jimp from 'jimp'
import regions from '../../regions'
import readImage from '../../readImage'

export default async function (img) {
  const {x, y, w, h} = regions.p1440.searching.rect
  const buffer = await img.crop(x, y, w, h).getBufferAsync(jimp.MIME_PNG)
  const text = await readImage(buffer)
  return text.trim() === 'SEARCHING'
}
