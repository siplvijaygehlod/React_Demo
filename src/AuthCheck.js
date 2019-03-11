import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {logOutUserAction} from './actions'

class AuthCheck extends React.Component {
  
    onSubmit = () => {
      this.props.logOutUserAction();
      
    }
  renderAuthButton () {
    if (!localStorage.getItem("authToken")) {
      return (
          <div className="a">
            <Link className='ui button primary' to={`/user/login`}> Login</Link>
            <Link className='ui button red' to={`/user/register`}> Register</Link>
          </div>
      )
    } else {
      return (
        <div className="a">
            {/* <Link className='ui button primary'
                  to={`/user/profileUpdate/${localStorage.getItem("loggedInUserId")}`}> Update Profile</Link> */}
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

export default connect(null,{logOutUserAction})(AuthCheck)
