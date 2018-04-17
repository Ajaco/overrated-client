import jimp from 'jimp'
import path from 'path'
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
  } = regions

  if (await isResult('victory', img, victory)) {
    console.log('Game registered as Victory')
    const map = await getText(img, victoryMap)
    const duration = await getText(img, victoryDuration, 'time')
    return {result: result.VICTORY, map, duration}
  }

  if (await isResult('defeat', img, defeat)) {
    console.log('Game registered as Defeat')
    const map = await getText(img, defeatMap)
    const duration = await getText(img, defeatDuration, 'time')
    return {result: result.DEFEAT, map, duration}
  }

  if (await isResult('draw', img, draw)) {
    console.log('Game registered as Draw')
    const map = await getText(img, drawMap)
    const duration = await getText(img, drawDuration, 'time')
    return {result: result.DRAW, map, duration}
  }

  return {}
}

const getText = async (img, {x, y, w, h}, config) => {
  const buffer = await img
    .clone()
    .crop(x, y, w, h)
    .getBufferAsync(jimp.MIME_PNG)
  const text = await readImage(buffer, config)
  return text.replace(/ /g, '').trim()
}

const isResult = async (type, img, {x, y, w, h}) => {
  const filePath = path.join(global.baseDir, `externals/assets/${type}_template.png`)
  const template = await jimp.read(filePath)
  const crop = img.clone().crop(x, y, w, h)

  const {percent} = jimp.diff(template, crop)

  const res = percent < 0.15
  return res
}
