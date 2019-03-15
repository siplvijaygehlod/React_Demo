import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.
Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'

class UserForm extends React.Component {

  renderRegisterError({error,touched}){
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
 renderInputForm = ({input,idLable,inputType, label,meta}) => {
  
   const className= `field ${meta.error && meta.touched ? 'error' : '' }`;
    return (
      <div className={className}>
        <label>
          {label}
        </label>
        <input {...input} id={idLable} type={inputType} autoComplete="off"/>
        {this.renderRegisterError(meta)}
      </div>
    )
  }

  renderPasswordForm = ({input,idLable,inputType, label,meta}) => {
  
    const className= `field ${meta.error && meta.touched ? 'error' : '' }`;
     return (
       <div className={className}>
         <label>
           {label}
         </label>
         <input {...input} id={idLable} type={inputType} autoComplete="off"/>
         {this.renderRegisterError(meta)}
       </div>
     )
   }

  onSubmit = formValues => {
    formValues= _.omit(formValues,'cpassword')
    this.props.onSubmit(formValues);
  }

  render () {
    return (
      <div>
        
         {/* this.props.handleSubmit() auto call the preventDefault */}
       
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        {/* name props in field is for manage the form field
            and it is required props for field and all the props are send
            to helper function by component */}
        
        <Field 
          inputType='text'
          name='first_name'
          component={this.renderInputForm}
          idLable='fname'
          label='Enter First Name'
        />
        <Field 
          inputType='text'
          name='last_name'
          component={this.renderInputForm}
          idLable='lname'
          label='Enter Last Name'
        />
        <Field 
          inputType='email'
          name='email'
          component={this.renderInputForm}
          idLable='email'
          label='Enter Email ID'
        />
        <Field 
          inputType='text'
          name='username'
          component={this.renderInputForm}
          idLable='username'
          label='Enter User Name'
        />
        <Field 
          inputType='password' 
          name='password' 
          component={this.renderPasswordForm} 
          idLable='psw' 
          label='Enter Password'
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Must contain at least one number and one uppercase and
            lowercase letter, and at least 8 or more characters"
        />
        <Field 
          inputType='password' 
          name='cpassword' 
          component={this.renderPasswordForm} 
          idLable='cpsw' 
          label='Confirm Password'
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Must contain at least one number and one uppercase and
            lowercase letter, and at least 8 or more characters"
        />
        
        <button className="ui button primary" id="submitButton">Submit</button>
      </form>
      </div>      
    )
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

  if(!formValues.first_name){
    errors.first_name = "Please specify first name.";
  }else if(formValues.first_name.length>30){
    errors.first_name = 'Please use atmost 30 characters for firstname.'
  }

  if(!formValues.last_name){
    errors.last_name = "Please specify last name";
  }else if(formValues.last_name.length>30){
    errors.last_name = 'Please use atmost 30 characters for last name.'
  }

  if(!formValues.email){
    errors.email = "Please specify Email-Id"; 
  }else if(formValues.email.length>50){
    errors.email = 'Please use atmost 30 characters for Email-Id.'
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Please specify a valid Email-Id.'
  }

  if(!formValues.password){
    errors.password = "Please specify password.";
  }else if(formValues.password.length<6){
    errors.password = 'Please use atleast 6 characters for password.'
  }else if (!/[^a-z]/i.test(formValues.password)) {
    errors.password = 'Please specify alphanumeric.'
  }

  if(!formValues.cpassword){
    errors.cpassword = "Please specify password here as well for confirmation.";
  }else if (!/[^a-z]/i.test(formValues.cpassword)) {
    errors.cpassword = 'Please specify alphanumeric values.'
  }

  if(formValues.password !== formValues.cpassword){
    errors.cpassword = "please specify same password in both fields.";
  }
  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
export default reduxForm({
    form: 'registerForm',
    validate
  })(UserForm);

