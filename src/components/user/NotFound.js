import React from 'react'
import history from '../../history'

import {toastr} from 'react-redux-toastr'

const toastrWarningFunction = (title,msg) => toastr.error(title,msg) 

class NotFound extends React.Component {
  renderHelper () {
    return (
      <div>
        {toastrWarningFunction(`Bad Page URL `,`Sorry this page is not available`)}
        {history.push('/')}
      </div>
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
