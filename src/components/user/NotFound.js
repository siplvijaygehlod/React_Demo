import React from 'react'
import history from '../../history'

class NotFound extends React.Component {
  renderHelper () {
    return (
    history.push('/')
    )
  }
  
  render () {
    return (
      <div>
        {this.renderHelper()}
      </div>
    )
  }
}

export default NotFound
