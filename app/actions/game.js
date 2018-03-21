// @flow
export const CHANGED_GAME_STATE = 'CHANGED_GAME_STATE'
export const POLLING_STARTED = 'POLLING_STARTED'
export const POLLING_STOPPED = 'POLLING_STOPPED'
export const INTERVAL_SET = 'INTERVAL_SET'
export const SCREEN_CAPTURED = 'SCREEN_CAPTURED'
export const STATS_RESET = 'STATS_RESET'
export const STATS_RECORDED = 'STATS_RECORDED'

export const notifyScreenCaptured = () => ({type: SCREEN_CAPTURED})
export const changeGameState = state => ({
  type: CHANGED_GAME_STATE,
  payload: {state, updatedAt: new Date()}
})
export const startPolling = () => ({type: POLLING_STARTED})
export const stopPolling = () => ({type: POLLING_STOPPED})
export const setInterval = payload => ({type: INTERVAL_SET, payload})
export const resetStats = () => ({type: STATS_RESET})
export const recordStats = payload => ({type: STATS_RECORDED, payload})
