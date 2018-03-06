// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import JokeTeller from './JokeTeller'
import { startPolling, stopPolling } from '../actions/joke'

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
  font-weight: bold;
`

type Props = {}

class Home extends Component<Props> {
  componentDidMount() {
    this.props.startPolling()
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  props: Props

  render() {
    return (
      <div>
        <Container data-tid="container">
          <StyledHeader>Overrated</StyledHeader>
          <JokeTeller />
        </Container>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startPolling, stopPolling }, dispatch)
}

export default connect(null, mapDispatchToProps)(Home)
