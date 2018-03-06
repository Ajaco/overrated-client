// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'

const history = createBrowserHistory()
const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(thunk, router, sagaMiddleware)

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history, sagaMiddleware }
