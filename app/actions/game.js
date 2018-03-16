// @flow
export const CHANGED_GAME_STATE = 'CHANGED_GAME_STATE'
export const POLLING_STARTED = 'POLLING_STARTED'
export const POLLING_STOPPED = 'POLLING_STOPPED'
export const INTERVAL_SET = 'INTERVAL_SET'
export const SCREEN_CAPTURED = 'SCREEN_CAPTURED'

export const notifyScreenCaptured = () => ({ type: SCREEN_CAPTURED })
export const changeGameState = payload => ({
  type: CHANGED_GAME_STATE,
  payload
})
export const startPolling = () => ({ type: POLLING_STARTED })
export const stopPolling = () => ({ type: POLLING_STOPPED })
export const setInterval = payload => ({ type: INTERVAL_SET, payload })
