import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setInterval } from '../actions/game'

type Props = {
  setInterval: func,
  game: object
}

class GameState extends Component<Props> {
  render() {
    const { game: { state, interval } } = this.props
    return (
      <div>
        <div>Set interval: {interval}</div>
        <input
          type="number"
          onBlur={e => this.props.setInterval(parseInt(e.target.value, 10))}
        />
        <div>current game state: {state}</div>
        <img
          src={`../someScreenshot.png?${new Date().getTime()}`}
          alt="mccree"
          style={{ width: 500 }}
        />
      </div>
    )
  }
}

const mapStateToProps = game => game

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setInterval }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameState)
