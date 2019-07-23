import React, { Component } from 'react'
import { Provider } from 'react-redux'

import routes from './routes'
import configureStore from './store'

const store = configureStore()

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        { routes }
      </Provider>
    );
  }
}

export default App
