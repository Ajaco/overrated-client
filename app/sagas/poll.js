import { delay, effects } from 'redux-saga'
import {
  POLLING_STARTED,
  POLLING_STOPPED,
  captureScreen,
  startGame,
  closeGame
} from '../actions/game'
import { getGamePid } from '../utils'
import { screenshot } from '../imaging'

const {
  take, race, call, put, select
} = effects

function* pollSaga() {
  while (true) {
    const { state, interval } = yield select(({ game }) => ({
      state: game.state,
      interval: game.interval
    }))

    const pid = yield getGamePid()

    // If game is not running, then we just wait for another loop
    if (!pid) {
      // If previous state was something else than NOT_RUNNING, close game.
      if (state !== 'NOT_RUNNING') yield put(closeGame())
      yield call(delay, interval)
      continue
    }

    // If game is running

    switch (state) {
      case 'NOT_RUNNING':
        yield put(startGame())
        break
      default:
        yield screenshot(pid)
        yield put(captureScreen())
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
