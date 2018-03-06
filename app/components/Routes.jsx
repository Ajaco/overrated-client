/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './Home'

export default () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
)
