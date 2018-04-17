import React, {Component} from 'react'
import {connect} from 'react-redux'
import Store from 'electron-store'
import {Tag, Input} from 'antd'
import path from 'path'
import {gameStates as gs} from '../utils'

type Props = {
  game: object
}

class GameState extends Component<Props> {
  state = {
    electronStore: new Store()
  }

  render() {
    const {
      game: {state, interval}
    } = this.props
    const {electronStore} = this.state
    return (
      <div>
        <div>Polling rate in MS: {interval}</div>
        <div>
          <span>Username:</span>
          <Input
            style={{margin: 20, width: 150}}
            defaultValue={electronStore.get('user')}
            onBlur={e => {
              electronStore.set('user', e.target.value)
            }}
          />
        </div>
        <div style={{marginTop: 20, marginBottom: 20}}>
          Current game state: <Tag color={gs[state].color}>{gs[state].displayName}</Tag>
        </div>
        {state !== gs.NOT_RUNNING.value && (
          <img
            src={`${path.join(global.baseDir, 'externals/ow.png')}?${new Date().getTime()}`}
            alt="screenshot"
            style={{width: 500}}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = game => game

export default connect(mapStateToProps)(GameState)
