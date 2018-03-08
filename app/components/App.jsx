// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import Routes from './Routes'

type Props = {
  store: {},
  history: {}
}

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <LocaleProvider locale={enGB}>
            <Routes />
          </LocaleProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}
