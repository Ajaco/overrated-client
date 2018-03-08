import { delay, effects } from 'redux-saga'
import path from 'path'
import edge from 'edge'
import fs from 'fs'
import {
  POLLING_STARTED,
  POLLING_STOPPED,
  captureScreen,
  startGame,
  closeGame
} from '../actions/game'
import { getGamePid } from './helpers'

const {
  take, race, call, put, select
} = effects

const onScreenshot = async (err, res) => {
  if (err) console.error('error', err)
  fs.writeFileSync('someScreenshot.png', res)
}

function* pollSaga() {
  while (true) {
    const { state, interval } = yield select(({ game }) => ({
      state: game.state,
      interval: game.interval
    }))

    const pid = yield getGamePid()

    switch (state) {
      case 'NOT_RUNNING':
        if (pid) {
          yield put(startGame())
        }
        break
      case 'RUNNING':
        if (!pid) {
          yield put(closeGame())
          break
        }
        const screenshot = edge.func(path.join(__dirname, '../cs/screenshotter.cs'))
        screenshot(pid, onScreenshot)
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
