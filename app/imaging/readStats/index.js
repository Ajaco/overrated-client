import jimp from 'jimp'
import skillRating from './skillRating'
import gameResult from './gameResult'

export default async function (screen) {
  const img = await jimp.read(screen)
  const {result, map, duration} = await gameResult(img)
  const sr = await skillRating(img)

  return {result, map, duration, sr}
}
