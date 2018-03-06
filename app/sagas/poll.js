import { delay, effects } from 'redux-saga'
import path from 'path'
import edge from 'edge'
import fs from 'fs'
import { POLLING_STARTED, POLLING_STOPPED } from '../actions/joke'

const { take, race, call } = effects

const onScreenshot = async (err, res) => {
  if (err) console.error('error', err)
  fs.writeFileSync('someScreenshot.png', res)

function* pollSaga() {
  while (true) {
    const screenshot = edge.func(path.join(__dirname, '../cs/screenshotter.cs'))
    const res = yield screenshot(0, onScreenshot)
    yield call(delay, 5000)
    // try {
    //   const response = yield fetch('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke')
    //   const data = yield response.json()
    //   yield put(getDataSuccess(data))
    //   const interval = yield select(state => state.joke.interval)
    //   console.log('interval?')
    //   console.log(interval)
    //   yield call(delay, interval)
    // } catch (err) {
    //   yield put(getDataFailure(err))
    // }
  }
}

export default function* watchPollSaga() {
  while (true) {
    yield take(POLLING_STARTED)
    yield race([call(pollSaga), take(POLLING_STOPPED)])
  }
}
