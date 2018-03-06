// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import joke from './joke'

const rootReducer = combineReducers({
  joke,
  router
})

export default rootReducer
