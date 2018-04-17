import React, {Component} from 'react'
import {connect} from 'react-redux'
import Store from 'electron-store'
import {Tag, Input} from 'antd'
import path from 'path'
import styled from 'styled-components'
import {gameStates as gs} from '../utils'

type Props = {
  game: object
}

const StyledHeader = styled.div`
  font-size: 60px;
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

class GameState extends Component<Props> {
  state = {
    electronStore: new Store()
  }

  render() {
    const {
      game: {state}
    } = this.props
    const {electronStore} = this.state
    return (
      <div>
        <StyledHeader>overrated</StyledHeader>
        <div style={{marginBottom: 20}}>
          <Tag color={gs[state].color}>{gs[state].displayName}</Tag>
          <div>
            <span>Username:</span>
            <Input
              style={{margin: 20, width: 150, height: 25}}
              defaultValue={electronStore.get('user')}
              onBlur={e => {
                electronStore.set('user', e.target.value)
              }}
            />
          </div>
        </div>

        {state !== gs.NOT_RUNNING.value && (
          <div>
            <img
              src={`${path.join(global.baseDir, 'externals/ow.png')}?${new Date().getTime()}`}
              alt="screenshot"
              style={{width: 500}}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = game => game

export default connect(mapStateToProps)(GameState)
