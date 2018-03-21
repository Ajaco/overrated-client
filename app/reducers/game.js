// @flow
import {
  CHANGED_GAME_STATE,
  POLLING_STARTED,
  POLLING_STOPPED,
  INTERVAL_SET,
  SCREEN_CAPTURED,
  STATS_RECORDED,
  STATS_RESET
} from '../actions/game'
import {gameStates as gs} from '../utils'

const initialState = {
  polling: false,
  interval: 5000,
  state: gs.NOT_RUNNING.value,
  stats: []
}

export default (state = initialState, {type, payload}) => {
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
        state: payload.state,
        stateUpdatedAt: payload.updatedAt
      }
    case SCREEN_CAPTURED:
      return {...state}
    case STATS_RECORDED:
      return {...state, stats: [...state.stats, payload]}
    case STATS_RESET:
      return {...state, stats: []}
    default:
      return state
  }
}
