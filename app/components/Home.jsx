// @flow
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import GameState from './GameState'
import {startPolling, stopPolling} from '../actions/game'

type Props = {
  startPolling: func,
  stopPolling: func
}

class Home extends Component<Props> {
  props: Props
  componentDidMount() {
    this.props.startPolling()
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  render() {
    return (
      <div style={{padding: 30}}>
        <GameState />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startPolling, stopPolling}, dispatch)
}

export default connect(null, mapDispatchToProps)(Home)
