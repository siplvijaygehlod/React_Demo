import React from 'react'
import { Link } from 'react-router-dom'

class AuthCheck extends React.Component {
    state = {demoVal:true}

  renderAuthButton () {
    if (this.state.demoVal) {
      return (
          <div className="a">
            <Link className='ui button primary' to={`/user/login`}> Login</Link>
            <Link className='ui button red' to={`/user/register`}> Register</Link>
          </div>
      )
    } else {
      return (
        <div className="a">
            <Link className='ui button primary' to={`/user/profileUpdate`}> Update Profile</Link>
            <Link className='ui button red' to={`/user/logout`}> Logout</Link>
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
