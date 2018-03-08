// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GameState from './GameState'
import { startPolling, stopPolling } from '../actions/game'

const Container = styled.div`
  h2 {
    font-size: 5rem;
  }
  a {
    font-size: 1.4rem;
  }
`

const StyledHeader = styled.div`
  color: #f99e1a;
  font-size: 80px;
  font-weight: lighter;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

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
      <div>
        <Container data-tid="container" style={{ padding: 30 }}>
          <StyledHeader>overrated</StyledHeader>
          <GameState />
        </Container>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startPolling, stopPolling }, dispatch)
}

export default connect(null, mapDispatchToProps)(Home)
