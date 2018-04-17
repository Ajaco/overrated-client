import jimp from 'jimp'
import promisify from 'util-promisify'
import {isSearching, isScorescreen, isIngame} from './states'
import {gameStates as gs} from '../../utils'

jimp.prototype.getBufferAsync = promisify(jimp.prototype.getBuffer)

export default async function (oldState, image, lastUpdated = new Date()) {
  const timeDiff = (new Date().getTime() - lastUpdated.getTime()) / 1000
  if (oldState === gs.SCORE_SCREEN.value && timeDiff < 40) {
    return gs.SCORE_SCREEN.value
  }

  if (await isSearching(image.clone())) return gs.SEARCHING.value
  if (await isScorescreen(image.clone())) return gs.SCORE_SCREEN.value
  if (oldState !== gs.IN_GAME.value && (await isIngame(image.clone()))) {
    return gs.IN_GAME.value
  }

  return oldState === gs.IN_GAME.value ? gs.IN_GAME.value : gs.IN_MENUS.value
}
