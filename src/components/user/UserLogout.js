import React from 'react'
import {connect} from 'react-redux'
import {logOutUserAction} from '../../actions'


class UserLogout extends React.Component {

  render () {
    return (
      <div>
        <h3>Logout</h3>
        {this.props.logOutUserAction()}
      </div>
    )
  }
}

export default connect(null,{logOutUserAction})(UserLogout)
