import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.
Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'
//import {validation} from '../../validation'

class UserForm extends React.Component {

/*   state= {type:'password'} */

  renderRegisterError({error,touched}){
    if(touched && error){
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  showPassword = () => {

    /* if(this.state.type === "password"){
      console.log(this.state.type)
      this.setState({type:"text"})
      console.log(this.state.type)
    }else{
      console.log(this.state.type)
      this.setState({type:"password"})
      console.log(this.state.type)
    } */
     let x = document.getElementById("psw");
    let y = document.getElementById("cpsw");


    if(x && y){
      if (x.type === "password" && y.type === "password") {
        x.type = "text";
        y.type = "text";

      } else {
        x.type = "password";
        y.type = "password";
      }
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

  renderCheckbox = ({input,label,inputType, }) => {
    return (
      <div className='field'>
      <label>
          {label}
        </label>
        <input {...input} type={inputType} autoComplete="off" onClick={this.showPassword}
        />
        
      </div>
    )
  }

  onSubmit = formValues => {
    document.getElementById("submitButton").disabled = 'true';
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
        <Field 
          inputType='checkbox' 
          name='checkbox' 
          component={this.renderCheckbox} 
          label='Show Password'
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
    errors.username = "no username!!!";
  }else if (!/[^a-z]/i.test(formValues.username)) {
    errors.username = 'Only Alfanumeric value will aceepted'
  }else if(formValues.username.length>30){
    errors.username = 'Max length is 30 character'
  }

  if(!formValues.first_name){
    errors.first_name = "no first name!!!";
  }else if(formValues.first_name.length>30){
    errors.first_name = 'Max length is 30 character'
  }

  if(!formValues.last_name){
    errors.last_name = "no last name!!!";
  }else if(formValues.last_name.length>30){
    errors.last_name = 'Max length is 30 character'
  }

  if(!formValues.email){
    errors.email = "no email!!!"; 
  }else if(formValues.email.length>50){
    errors.email = 'Max length is 50 character'
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Enter Valid Email'
  }

  if(!formValues.password){
    errors.password = "no password!!!";
  }else if(formValues.password.length<6){
    errors.password = 'Minimum length is 6 character'
  }else if(formValues.password.length>20){
    errors.password = 'Max length is 20 character'
  }else if (!/[^a-z]/i.test(formValues.password)) {
    errors.password = 'Only Alfanumeric value will aceepted'
  }

  if(!formValues.cpassword){
    errors.cpassword = "no confirm Password!!!";
  }else if(formValues.cpassword.length>20){
    errors.cpassword = 'Max length is 20 character'
  }else if (!/[^a-z]/i.test(formValues.cpassword)) {
    errors.cpassword = 'Only Alfanumeric value will aceepted'
  }

  if(formValues.password !== formValues.cpassword){
    errors.cpassword = "mismatch password!!!";
  }
  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
export default reduxForm({
    form: 'registerForm',
    validate
  })(UserForm);

