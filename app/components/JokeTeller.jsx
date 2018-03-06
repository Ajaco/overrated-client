import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setInterval } from '../actions/joke'

type Props = {
  setInterval: func,
  joke: object
}

class JokeTeller extends Component<Props> {
  render() {
    const { joke: { data, interval } } = this.props
    return (
      <div>
        <div>Set interval: {interval}</div>
        <input
          type="number"
          onBlur={e => this.props.setInterval(parseInt(e.target.value, 10))}
        />
        <div>Joke type: {data.type}</div>
        <div>{data.setup}</div>
        <div>{data.punchline}</div>
      </div>
    )
  }
}

const mapStateToProps = joke => joke

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setInterval }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(JokeTeller)
