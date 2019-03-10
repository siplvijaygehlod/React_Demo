import React from 'react'

import {updateUserAction,getLoggedInUserDetailAction} from '../../actions'
import { connect } from 'react-redux';
import UserForm from './UserForm';
import history from '../../history'

class UserProfileUpdate extends React.Component {

  onSubmit = formValues => {
    console.log(formValues);
    //this.props.updateUser(formValues);
  }


  render () {
    if(localStorage.getItem("authToken")){
      return (
        <div>
          <h3>Update Your Profile</h3>
          <UserForm onSubmit={this.onSubmit} />
      </div>    
      )
     }
      else{
        return(
          <div>
          {history.push('/user/login')}
          </div>
        )
      }
    }
  }
const mapStateToProps = (state,ownProps) => {
  console.log(ownProps.match.params.id)
    return {
      userDetail:state.user[ownProps.match.params.id]
    }
  }

export default connect(mapStateToProps,{getLoggedInUserDetailAction,updateUserAction})(UserProfileUpdate)
