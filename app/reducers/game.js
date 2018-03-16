// @flow
import {
  CHANGED_GAME_STATE,
  POLLING_STARTED,
  POLLING_STOPPED,
  INTERVAL_SET,
  SCREEN_CAPTURED
} from '../actions/game'
import gs from '../utils/gameStates'

const initialState = {
  polling: false,
  interval: 5000,
  state: gs.NOT_RUNNING.value
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
    case CHANGED_GAME_STATE:
      return {
        ...state,
        state: payload
      }
    case SCREEN_CAPTURED:
      return { ...state }
    default:
      return state
  }
}
