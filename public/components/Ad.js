import React, { Component } from 'react'

class Ad extends Component {

  render () {
    return <div className='col-sm-6 col-md-4'>
      <img src={`/ads/?r=${Math.floor(Math.random()*1000)}`} className='ad' />
    </div>
  }

}

export default Ad
