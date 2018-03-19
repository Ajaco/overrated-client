import jimp from 'jimp'
import regions from '../../regions'
import readImage from '../../readImage'

export default async function (img) {
  const {ingame: {rect: ingame}, ingame2: {rect: ingame2}} = regions.p1440
  const ingameImg = await img
    .clone()
    .crop(ingame.x, ingame.y, ingame.w, ingame.h)
    .getBufferAsync(jimp.MIME_PNG)
  const text = await readImage(ingameImg)
  if (text.trim() === 'CONTINUE' || text.trim() === 'SELECT') return true

  const ingameImg2 = await img
    .clone()
    .crop(ingame2.x, ingame2.y, ingame2.w, ingame2.h)
    .getBufferAsync(jimp.MIME_PNG)
  const text2 = await readImage(ingameImg2)
  return text2.trim() === 'CHANGE HERO'
}
