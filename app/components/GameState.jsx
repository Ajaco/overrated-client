import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Tag } from 'antd'
import { setInterval } from '../actions/game'

type Props = {
  setInterval: func,
  game: object
}

const statuses = {
  RUNNING: { name: 'Running', color: '#87d068' },
  NOT_RUNNING: { name: 'Not running', color: '#f50' }
}

class GameState extends Component<Props> {
  render() {
    const { game: { state, interval } } = this.props
    return (
      <div>
        <div>
          Polling rate in MS:
          <Input
            defaultValue={interval}
            style={{ marginLeft: 15, width: 400 }}
            type="number"
            onBlur={e => this.props.setInterval(parseInt(e.target.value, 10))}
          />
        </div>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          Current game state:{' '}
          <Tag color={statuses[state].color}>{statuses[state].name}</Tag>
        </div>
        {state === 'RUNNING' && (
          <img
            src={`../someScreenshot.png?${new Date().getTime()}`}
            alt="mccree"
            style={{ width: 500 }}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = game => game

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setInterval }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameState)
