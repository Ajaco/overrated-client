// @flow
export const GAME_STARTED = 'STARTED_GAME'
export const GAME_CLOSED = 'CLOSED_GAME'
export const POLLING_STARTED = 'POLLING_STARTED'
export const POLLING_STOPPED = 'POLLING_STOPPED'
export const INTERVAL_SET = 'INTERVAL_SET'
export const SCREEN_CAPTURED = 'SCREEN_CAPTURED'

export const captureScreen = () => ({ type: SCREEN_CAPTURED })
export const startGame = payload => ({ type: GAME_STARTED, payload })
export const closeGame = payload => ({ type: GAME_CLOSED, payload })
export const startPolling = () => ({ type: POLLING_STARTED })
export const stopPolling = () => ({ type: POLLING_STOPPED })
export const setInterval = payload => ({ type: INTERVAL_SET, payload })
