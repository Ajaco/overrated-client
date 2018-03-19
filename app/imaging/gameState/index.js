import jimp from 'jimp'
import promisify from 'util-promisify'
import {isSearching, isScorescreen, isIngame} from './states'
import gs from '../../utils/gameStates'

jimp.prototype.getBufferAsync = promisify(jimp.prototype.getBuffer)

export default async function (oldState, screen) {
  const img = await jimp.read(screen)
  if (await isSearching(img.clone())) return gs.SEARCHING.value
  if (await isScorescreen(img.clone())) return gs.SCORE_SCREEN.value
  if (oldState !== gs.IN_GAME.value && (await isIngame(img.clone()))) {
    return gs.IN_GAME.value
  }

  return oldState === gs.IN_GAME.value ? gs.IN_GAME.value : gs.IN_MENUS.value
}
