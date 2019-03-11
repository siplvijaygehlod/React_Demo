import React from 'react'
import _ from 'lodash'
import {postCreateAction} from '../../actions'
import { connect } from 'react-redux';
import PostForm from './PostForm';
//import {validation} from '../../validation'
import history from '../../history'

class PostCreate extends React.Component {
  
  onSubmit = formValues => {
    let role = {
      role:'author'
    }
    formValues= _.assign(formValues,role)
    //console.log(formValues)
    this.props.postCreateAction(formValues);
  }

  renderCreateData(){
    if(localStorage.getItem("authToken")){
      return (
        <div>
          <h3>Create new post</h3>
          <PostForm onSubmit={this.onSubmit} />    
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

  render () {
   return (
     <div>
      {this.renderCreateData()}
     </div>
   )
  }
}

export default connect(null,{postCreateAction})(PostCreate)

