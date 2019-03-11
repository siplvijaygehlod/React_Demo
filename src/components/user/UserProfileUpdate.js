import React from 'react'
import _ from 'lodash'
import {updateUserAction,getLoggedInUserDetailAction} from '../../actions'
import { connect } from 'react-redux';
import UserForm from './UserForm';
import history from '../../history'

class UserProfileUpdate extends React.Component {

  componentDidMount(){
    this.props.getLoggedInUserDetailAction(this.props.match.params.id);
  }
  
  onSubmit = formValues => {
    console.log(formValues);
    //this.props.updateUser(formValues);
  }


  render () {
    if(localStorage.getItem("authToken")){
      return (
        <div>
          <h3>Update Your Profile</h3>
          <UserForm initialValues={_.pick(this.props.userDetail,'username')} onSubmit={this.onSubmit} />
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
  //console.log(state.user)
    return {
      userDetail:state
    }
  }

export default connect(mapStateToProps,{getLoggedInUserDetailAction,updateUserAction})(UserProfileUpdate)
