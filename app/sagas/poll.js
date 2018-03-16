import { delay, effects } from 'redux-saga'
import {
  POLLING_STARTED,
  POLLING_STOPPED,
  notifyScreenCaptured,
  changeGameState
} from '../actions/game'
import { getGamePid } from '../utils'
import { screenshot, gameState } from '../imaging'

const { take, race, call, put, select } = effects

function* pollSaga() {
  while (true) {
    const { state: previousState, interval } = yield select(({ game }) => ({
      state: game.state,
      interval: game.interval
    }))

    const pid = yield getGamePid()

    // If game is not running, then we just wait for another loop
    if (!pid) {
      // If previous state was something else than NOT_RUNNING, close game.
      if (previousState !== 'NOT_RUNNING') {
        yield put(changeGameState('NOT_RUNNING'))
      }
      console.log('game not running.. repolling')
      yield call(delay, interval)
      continue
    }

    // If game is running
    const screen = yield screenshot(pid)
    yield put(notifyScreenCaptured())

    const currentState = yield gameState(previousState, screen)
    if (currentState !== previousState) {
      yield put(changeGameState(currentState))
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
