// @flow
import {
  GET_DATA_SUCCEEDED,
  POLLING_STARTED,
  POLLING_STOPPED,
  INTERVAL_SET
} from '../actions/joke'

const initialState = {
  data: false,
  polling: false,
  interval: 5000
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
    case GET_DATA_SUCCEEDED:
      return {
        ...state,
        data: payload
      }
    default:
      return state
  }
}
