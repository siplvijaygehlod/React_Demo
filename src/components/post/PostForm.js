import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.

Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'
//import {validation} from '../../validation'

class PostForm extends React.Component {

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

 renderInputField = ({input,idLable,inputType, label,meta}) => {
  const className= `field ${meta.error && meta.touched ? 'error' : '' }`;
  //console.log(selectOption)
  if(inputType=== 'text'){
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
  if(inputType === "select"){
    /* onScroll={this.onScrollThatCallsPreventDefault}
  onScrollPassive={this.onScrollThatJustListens} */
    return (
      <div className={className}>
        <label>
          {label}
        </label>
        <select id={idLable} {...input}>
          <option>Select Post Status</option>
          <option value="publish">Publish</option>
          <option value="future">Future</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="draft">Private</option> 
        </select>
        {this.renderLoginError(meta)}
      </div>
    )
  }
  /* if(inputType=== 'textarea'){
    return (
      <div className={className}>
        <label>
          {label}
        </label>
        <textarea rows="4" ></textarea>
        
      </div>
    )
  } */
  
}


onSubmit = formValues => {
  this.props.onSubmit(formValues);
  //console.log(formValues)
}
renderForm = () => {
  return (
    <div>
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        {/* name props in field is for manage the form field
            and it is required props for field and all the props are send
            to helper function by component */}
        
        <Field 
          inputType='text'
          name='title'
          component={this.renderInputField}
          idLable='title'
          label='Enter Title'
        />
        <Field 
          inputType='text' 
          name='content' 
          component={this.renderInputField} 
          idLable='desc' 
          label='Enter Description'          
        />
        { <Field 
          inputType='select' 
          name='status' 
          component={this.renderInputField} 
          idLable='status' 
          label='Select Post Status'          
        /> }
        <button className="ui button primary" >Submit</button>
      </form>
    </div>
  )
}


  render () {
    return (
      <div>
       {this.renderForm()}
      </div>      
    )
  }
}


const validate = formValues => {
  const errors = {};
  
  if(!formValues.title){
    errors.title = "no title!!!"; 
  }else if(formValues.title.length>50){
    errors.title = 'Max length is 50 character'
  }
  
  if(!formValues.content){
    errors.content = "no description!!!";
  }else if(formValues.content.length>600){
    errors.content = 'Max length is 600 character'
  }else if(formValues.content.length<500){
    errors.content = 'Min length is 500 character'
  }

  if(!formValues.status){
    errors.status = "Select status!!!";
  }
  /* if(formValues.status !== "publish"){
    errors.status = "As a author you are only allow to use status publish";
  } */

  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
export default reduxForm({
    form: 'postForm',
    validate
  })(PostForm);

