import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.

Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'

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
  if(inputType=== 'text'){
    return (
      <div className={className}>
        <label>
          {label}
          <span>  (sssss)</span>
        </label>
        <input {...input} id={idLable} type={inputType} autoComplete="off"/>
        {this.renderLoginError(meta)}
      </div>
    )
  }
  if(inputType === "select"){
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
  }else{
    return (
      <div className={className}>
        <label>
          {label}
        </label>
        <textarea id={idLable} {...input} rows="4" cols="10" ></textarea>
        {this.renderLoginError(meta)}
      </div>
    )
  } 
  
}


  onSubmit = formValues => {
    this.props.onSubmit(formValues);
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
            name='content' 
            component={this.renderInputField} 
            idLable='desc' 
            label='Enter Description'          
          />
          <Field 
            inputType='select' 
            name='status' 
            component={this.renderInputField} 
            idLable='status' 
            label='Select Post Status'          
          /> 
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
    errors.title = "Please specify the title for your post."; 
  }
  else if(formValues.title.length>50){
    errors.title = 'Please specify atmost 50 characters for your title so it will be catchy for readers.'
  }
  else if(formValues.title.length<5){
    errors.title = 'Please specify atleast 5 characters for your title.'
  }
  
  if(!formValues.content){
    errors.content = "Please specify the content for your post.";
  }else if(formValues.content.length<10){
    errors.content = 'Please specify atleast 10 characters for your post.'
  }

  if(!formValues.status){
    errors.status = "Please select the status for your post.";
  }

  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
export default reduxForm({
    form: 'postForm',
    validate
  })(PostForm);

