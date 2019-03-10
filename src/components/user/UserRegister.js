import React from 'react'
import _ from 'lodash'
import {registerUserAction} from '../../actions'
import { connect } from 'react-redux';
import UserForm from './UserForm';
//import {validation} from '../../validation'
import history from '../../history'

class UserRegister extends React.Component {
  
  onSubmit = formValues => {
    let role = {
      role:'author'
    }
    formValues= _.assign(formValues,role)
    this.props.registerUser(formValues);
  }

  render () {
   if(!localStorage.getItem("authToken")){
    return (
      <div>
        <h3>Register Here</h3>
        <UserForm onSubmit={this.onSubmit} />
      </div>      
    )
   }
    else{
      return(
        <div>
        {history.push('/')}
        </div>
      )
    }
  }
}

export default connect(null,{registerUserAction})(UserRegister)

