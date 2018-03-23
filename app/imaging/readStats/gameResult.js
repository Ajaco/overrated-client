import jimp from 'jimp'
import uuid from 'uuid/v4'
import fs from 'fs'
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

  if (await isResult('victory', img, victory)) {
    console.log('Game registered as Victory')
    const map = await getText(img, victoryMap)
    const duration = await getText(img, victoryDuration)
    return {result: result.VICTORY, map: map.trim(), duration: duration.trim()}
  }

  if (await isResult('defeat', img, defeat)) {
    console.log('Game registered as Defeat')
    const map = await getText(img, defeatMap)
    const duration = await getText(img, defeatDuration)
    return {result: result.DEFEAT, map: map.trim(), duration: duration.trim()}
  }

  if (await isResult('draw', img, draw)) {
    console.log('Game registered as Draw')
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

  fs.writeFileSync(`/bugreport/${uuid()}.png`, buffer)
  return readImage(buffer)
}

const isResult = async (type, img, {x, y, w, h}) => {
  const template = await jimp.read(`app/assets/${type}_template.png`)
  const crop = img.clone().crop(x, y, w, h)

  const {percent} = jimp.diff(template, crop)

  console.log(`Diff for ${type} is: ${percent}`)
  const res = percent < 0.15
  console.log(`Returning ${res}, that game result is ${type}`)
  return res
}
