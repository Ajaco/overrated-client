import React from 'react'
import path from 'path'

import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import sagas from './sagas'
import {configureStore, history, sagaMiddleware} from './store/configureStore'
import App from './components/App'
import './app.global.css'

const store = configureStore()

if (process.env.NODE_ENV === 'development') {
  global.baseDir = __dirname
} else {
  global.baseDir = path.join(process.resourcesPath, 'app')
}

sagaMiddleware.run(sagas)

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
