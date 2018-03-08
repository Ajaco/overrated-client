// @flow
import {
  GAME_STARTED,
  GAME_CLOSED,
  POLLING_STARTED,
  POLLING_STOPPED,
  INTERVAL_SET
} from '../actions/game'

const initialState = {
  polling: false,
  interval: 5000,
  state: 'NOT_RUNNING'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INTERVAL_SET:
      return {
        ...state,
        interval: payload
      }
    case POLLING_STARTED:
      return {
        ...state,
        polling: true
      }
    case POLLING_STOPPED:
      return {
        ...state,
        polling: false
      }
    case GAME_STARTED:
      return {
        ...state,
        state: 'RUNNING'
      }
    case GAME_CLOSED:
      return {
        ...state,
        state: 'NOT_RUNNING'
      }
    default:
      return state
  }
}
