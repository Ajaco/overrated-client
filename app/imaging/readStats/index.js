import jimp from 'jimp'
import skillRating from './skillRating'
import gameResult from './gameResult'

export default async function (image) {
  const {result, map, duration} = await gameResult(image)
  const sr = await skillRating(image)

  return {result, map, duration, sr}
}
