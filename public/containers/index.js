import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SharedContainer extends Component {

  render () {
    return (
      <div className="root-container">
        {this.props.children}
      </div>
    )
  }
}

export default withRouter((SharedContainer))
