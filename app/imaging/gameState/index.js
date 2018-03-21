import jimp from 'jimp'
import promisify from 'util-promisify'
import {isSearching, isScorescreen, isIngame} from './states'
import {gameStates as gs} from '../../utils'

jimp.prototype.getBufferAsync = promisify(jimp.prototype.getBuffer)

export default async function (oldState, screen, lastUpdated = new Date()) {
  const timeDiff = (new Date().getTime() - lastUpdated.getTime()) / 1000
  if (oldState === gs.SCORE_SCREEN.value && timeDiff < 40) {
    return gs.SCORE_SCREEN.value
  }

  const img = await jimp.read(screen)
  if (await isSearching(img.clone())) return gs.SEARCHING.value
  if (await isScorescreen(img.clone())) return gs.SCORE_SCREEN.value
  if (oldState !== gs.IN_GAME.value && (await isIngame(img.clone()))) {
    return gs.IN_GAME.value
  }

  return oldState === gs.IN_GAME.value ? gs.IN_GAME.value : gs.IN_MENUS.value
}
