import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthCheck from '../AuthCheck'

class Header extends Component {
    state = {demoVal:true}

    userMenu(){
        if(this.state.demoVal){
            return (
                <div className='ui secondary pointing menu'>
                    <Link to='/' className='item'> React Demo App</Link>
                    <Link to='/' className='item'> View all Posts</Link>
                    <Link to='/post/create' className='item'> Create new Post</Link>
                    <div className='right menu'>
                        <AuthCheck />
                    </div>
                </div>
            )
        }else{
            return (
                <div className='ui secondary pointing menu'>
                    <Link to='/' className='item'> React Demo App</Link>
                    <Link to='/' className='item'> All Posts</Link>
                    <div className='right menu'>
                        <AuthCheck />
                    </div>
                </div>
            )
        }
    }

  render () {
    return (
        <div>
            {this.userMenu()}
        </div>
    )
  }
}

export default Header
