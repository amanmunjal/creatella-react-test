import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '../containers'
import Products from '../screens/Products'

export default (
  <Container>
    <Switch>
      <Route startsWith exact strict path='/' render={(props) => <Products {...props} />} />
    </Switch>
  </Container>
)
