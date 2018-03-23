import fs from 'fs'
import jimp from 'jimp'

import {delay, effects} from 'redux-saga'
import {
  POLLING_STARTED,
  POLLING_STOPPED,
  notifyScreenCaptured,
  changeGameState,
  recordStats,
  resetStats,
  setInterval
} from '../actions/game'
import {getGamePid, gameStates as gs, parseStats, submitStats} from '../utils'
import {screenshot, gameState, readStats, regions} from '../imaging'

const {take, race, call, put, select} = effects

function* pollSaga() {
  while (true) {
    const {
      state: previousState,
      interval,
      stateUpdatedAt,
      prevStats
    } = yield select(({game}) => ({
      state: game.state,
      prevStats: game.stats,
      stateUpdatedAt: game.stateUpdatedAt,
      interval: game.interval
    }))

    // const img = yield jimp.read('app/assets/test/defeat.png')
    // const template = yield jimp.read('app/assets/defeat_template.png')
    // const crop = img
    //   .clone()
    //   .crop(
    //     regions.p1440.defeat.rect.x,
    //     regions.p1440.defeat.rect.y,
    //     regions.p1440.defeat.rect.w,
    //     regions.p1440.defeat.rect.h
    //   )
    // const diff = jimp.diff(template, crop)

    // console.log(`diff in diff: ${diff}`)
    // console.log(diff)
    // diff.image.write('foo.png')
    // console.log(diff.percent < 0.15)

    const pid = yield getGamePid()

    // If game is not running, then we just wait for another loop
    if (!pid) {
      // If previous state was something else than NOT_RUNNING, close game.
      if (previousState !== gs.NOT_RUNNING.value) {
        yield put(changeGameState(gs.NOT_RUNNING.value))
      }
      console.log('Game not running.. repolling')
      yield call(delay, interval)
      continue
    }

    // If game is running
    const screen = yield screenshot(pid)
    yield put(notifyScreenCaptured())

    const currentState = yield gameState(previousState, screen, stateUpdatedAt)
    const stateChanged = currentState !== previousState
    if (stateChanged) {
      yield put(changeGameState(currentState))
    }

    if (stateChanged && previousState === gs.SCORE_SCREEN.value) {
      yield put(setInterval(5000))
      try {
        const stats = parseStats(prevStats)
        console.log('successfully parsed stats:')
        console.dir(stats)
        submitStats(stats)
        yield put(resetStats())
      } catch (error) {
        console.log('Error submitting stats:')
        console.error(error)
        fs.writeFileSync(
          `ow-game-bug-report-${new Date().getTime()}.json`,
          JSON.stringify(prevStats)
        )
      }
    }

    switch (currentState) {
      case gs.SCORE_SCREEN.value:
        if (stateChanged) yield put(setInterval(250))
        const stats = yield readStats(screen)
        yield put(recordStats(stats))
        break
    }

    yield call(delay, interval)
  }
}

export default function* watchPollSaga() {
  while (true) {
    yield take(POLLING_STARTED)
    yield race([call(pollSaga), take(POLLING_STOPPED)])
  }
}
