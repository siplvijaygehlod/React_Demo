import React from 'react'

import {updateUser} from '../../actions'
import { connect } from 'react-redux';
import UserForm from './UserForm';

class UserProfileUpdate extends React.Component {


  onSubmit = formValues => {
    console.log(formValues);
    //this.props.updateUser(formValues);
  }


  render () {
    return (
      <div>
        <h3>Update Your Profile</h3>
        <UserForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null,{updateUser})(UserProfileUpdate)
