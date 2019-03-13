import React from 'react'
import { Link } from 'react-router-dom'
import {toastr} from 'react-redux-toastr'

const toastrSuccessFunction = (title,msg) => toastr.success(title,msg)

class AuthCheck extends React.Component {
  
    onSubmit = (event) => {
      localStorage.removeItem("loggedInUserId")
      localStorage.removeItem("authToken");

      toastrSuccessFunction(`LogOut Status`,`You are logout Successfully`);
    }
  renderAuthButton () {
    if (!localStorage.getItem("authToken")) {
      return (
          <div className="a">
            <Link className='ui button primary' to={`/`}> Login</Link>
            <Link className='ui button red' to={`/user/register`}> Register</Link>
          </div>
      )
    } else {
      return (
        <div className="a">
             <span className='ui button'>{localStorage.getItem("displayName")}</span> 
            <Link className='ui button red' to={'/'} onClick={this.onSubmit}> Logout</Link>
        </div>
      )
    }
  }

  render () {
    return <div>
             {this.renderAuthButton()}
           </div>
  }
}

export default AuthCheck
