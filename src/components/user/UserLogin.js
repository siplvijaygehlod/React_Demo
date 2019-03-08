import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.

Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'
import {loginUser} from '../../actions'
import { connect } from 'react-redux';
//import {validation} from '../../validation'

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
 renderLoginForm = ({input,idLable,inputType, label,meta}) => {
  const className= `field ${meta.error && meta.touched ? 'error' : '' }`;
  return (
    <div className={className}>
      <label>
        {label}
      </label>
      <input {...input} id={idLable} type={inputType} autoComplete="off"/>
      {this.renderLoginError(meta)}
    </div>
  )
}


onSubmit = formValues => {
  this.props.loginUser(formValues);
}


  render () {
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
          idLable='username'
          label='Enter username'
        />
        <Field 
          inputType='password' 
          name='password' 
          component={this.renderLoginForm} 
          idLable='psw' 
          label='Enter Password'
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Must contain at least one number and one uppercase and
            lowercase letter, and at least 8 or more characters"
        />
        <button className="ui button primary" >Submit</button>
      </form>
      </div>      
    )
  }
}


const validate = formValues => {
  const errors = {};
  
  if(!formValues.username){
    errors.username = "no username!!!";
    
  }
  /* let limitLength = formValues.username.length;
  if(limitLength){
    errors.username = "less than defiened limit";
  }
 */
  if(!formValues.password){
    errors.password = "no password!!!";
  }

  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
 const loginRedux = reduxForm({
    form: 'loginForm',
    validate
  })(UserLogin);

  export default connect(null,{loginUser})(loginRedux);

