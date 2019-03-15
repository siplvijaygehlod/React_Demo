import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.

Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'
import {loginUserAction} from '../../actions'
import { connect } from 'react-redux';
import history from '../../history'

class UserLogin extends React.Component {

  renderLoginError({error,touched}){
    if(touched && error){
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  /* This is helper functoin for Field's component props
  which holds formProps param by-default and this is object.
  Currently we are destructing our input object from formProps.
  */
 renderLoginForm = ({input,id,inputType, label,meta}) => {
    const className= `field ${meta.error && meta.touched ? 'error' : '' }`;
    return (
      <div className={className}>
        <label>
          {label}
          
        </label>
        <input {...input} id={id} type={inputType} autoComplete="off"
        />
        
        {this.renderLoginError(meta)}
       
      </div>
    )
  }

onSubmit = formValues => {
  this.props.loginUserAction(formValues);
}


  render () {
    if(!localStorage.getItem("authToken")){
      return (
        <div>
          <h3>Login Here</h3>
  
           {/* this.props.handleSubmit() auto call the preventDefault */}
         
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          {/* name props in field is for manage the form field
              and it is required props for field and all the props are send
              to helper function by component */}
          
          <Field 
            inputType='text'
            name='username'
            component={this.renderLoginForm}
            id='username'
            label='Enter username'
          />
          <Field 
            inputType='password' 
            name='password' 
            component={this.renderLoginForm} 
            id='psw' 
            label='Enter Password'
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          />
          <button className="ui button primary" >Submit</button>
        </form>
        </div>      
      )
    }else{
      return(
        <div>
          {history.push('/post/list/1')}
        </div>
      )
    }
  }
}


const validate = formValues => {
  const errors = {};
  
  if(!formValues.username){
    errors.username = "Please specify username.";
  }else if (!/[^a-z]/i.test(formValues.username)) {
    errors.username = 'Please specify alphanumeric values.'
  }else if(formValues.username.length>30){
    errors.username = 'Please use atmost 30 characters for username.'
  } 
  
  

  if(!formValues.password){
    errors.password = "Please specify password.";
  } else if(formValues.password.length<6){
    errors.password = 'Please use atleast 6 characters for password.'
  } else if (!/[^a-z]/i.test(formValues.password)) {
    errors.password = 'Please specify alphanumeric values.'
  }
 
  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
 const loginRedux = reduxForm({
    form: 'loginForm',
    validate
  })(UserLogin);

  export default connect(null,{loginUserAction})(loginRedux);

