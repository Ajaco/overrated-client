import jimp from 'jimp'
import promisify from 'util-promisify'
import { isSearching } from './states'
import gs from '../../utils/gameStates'

jimp.prototype.getBufferAsync = promisify(jimp.prototype.getBuffer)

export default async function (oldState, screen) {
  const img = await jimp.read(screen)
  if (await isSearching(img)) {
    return gs.SEARCHING.value
  }
  // if (isLoading(img)) return gs.LOADING_SCREEN
  // if (isIngame(img)) return gs.IN_GAME
  // if (isOnScorescreen(img)) return gs.SCORE_SCREEN

  return gs.IN_MENUS.value
}
