import React from 'react'
import _ from 'lodash'
import {registerUser} from '../../actions'
import { connect } from 'react-redux';
import UserForm from './UserForm';
//import {validation} from '../../validation'

class UserRegister extends React.Component {
  
  onSubmit = formValues => {
    let role = {
      roles:'admin'
    }
    formValues= _.assign(formValues,role)
    this.props.registerUser(formValues);
  }

  render () {
    return (
      <div>
        <h3>Register Here</h3>
        <UserForm onSubmit={this.onSubmit} />
      </div>      
    )
  }
}

export default connect(null,{registerUser})(UserRegister)

