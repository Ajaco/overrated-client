import jimp from 'jimp'
import regions from '../regions'
import result from '../../utils/gameResult'
import readImage from '../readImage'

export default async function (img) {
  const {
    victory: {
      rect: victory,
      mapName: {rect: victoryMap},
      gameDuration: {rect: victoryDuration}
    },
    defeat: {
      rect: defeat,
      mapName: {rect: defeatMap},
      gameDuration: {rect: defeatDuration}
    },
    draw: {
      rect: draw,
      mapName: {rect: drawMap},
      gameDuration: {rect: drawDuration}
    }
  } = regions.p1440

  if (isResult('victory', img, victory)) {
    const map = await getText(img, victoryMap)
    const duration = await getText(img, victoryDuration)
    return {result: result.VICTORY, map: map.trim(), duration: duration.trim()}
  }

  if (isResult('defeat', img, defeat)) {
    const map = await getText(img, defeatMap)
    const duration = await getText(img, defeatDuration)
    return {result: result.DEFEAT, map: map.trim(), duration: duration.trim()}
  }

  if (isResult('draw', img, draw)) {
    const map = await getText(img, drawMap)
    const duration = await getText(img, drawDuration)
    return {result: result.DRAW, map: map.trim(), duration: duration.trim()}
  }
}

const getText = async (img, {x, y, w, h}) => {
  const buffer = await img
    .clone()
    .crop(x, y, w, h)
    .getBufferAsync(jimp.MIME_PNG)
  return readImage(buffer)
}

const isResult = async (type, img, {x, y, w, h}) => {
  const template = await jimp.read(`app/assets/${type}_template.png`)
  const crop = img.clone().crop(x, y, w, h)
  const {percent} = jimp.diff(template, crop)
  return percent < 0.15
}
