// @flow
export const GET_DATA_SUCCEEDED = 'GET_DATA_SUCCEEDED'
export const GET_DATA_FAILED = 'GET_DATA_FAILED'
export const POLLING_STARTED = 'POLLING_STARTED'
export const POLLING_STOPPED = 'POLLING_STOPPED'
export const INTERVAL_SET = 'INTERVAL_SET'

export const getDataSuccess = payload => ({ type: GET_DATA_SUCCEEDED, payload })
export const getDataFailure = payload => ({ type: GET_DATA_FAILED, payload })
export const startPolling = () => ({ type: POLLING_STARTED })
export const stopPolling = () => ({ type: POLLING_STOPPED })
export const setInterval = payload => ({ type: INTERVAL_SET, payload })
