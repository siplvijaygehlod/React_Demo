import React from 'react'
/* reduxForm is the same function as we are using 
till now using connect function and make sure that we 
call some action creator and store data.

Field is a built-in react component to which 
we are going to show on screen. */

import { Field, reduxForm } from 'redux-form'
import {postCreate} from '../../actions'
import { connect } from 'react-redux';
//import {validation} from '../../validation'

class PostCreate extends React.Component {

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

  renderOptions = ({input,idLable}) => {
    const selectOption= ['public','private','future','draft','pending'];
    console.log(selectOption)
    return (
      <div>
        <select id={idLable} {...input}  >
          <option>Select Post Status</option>
          {/* <option value={[0]}>Publish</option>
          <option>Future</option>
          <option>Draft</option>
          <option>Pending</option>
          <option>Private</option> */}
        </select>
      </div>
    )

  }
 renderLoginForm = ({input,idLable,inputType, label,meta}) => {
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
  }else {
    return (
      <div className={className}>
        <label>
          {label}
        </label>
        {({input,idLable})=>this.renderOptions}
        
        {this.renderLoginError(meta)}
      </div>
    )
  }
}


onSubmit = formValues => {
  //this.props.loginUser(formValues);
  console.log(formValues)
}


  render () {
    return (
      <div>
        <h3>Create a new post here</h3>

         {/* this.props.handleSubmit() auto call the preventDefault */}
       
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        {/* name props in field is for manage the form field
            and it is required props for field and all the props are send
            to helper function by component */}
        
        <Field 
          inputType='text'
          name='title'
          component={this.renderLoginForm}
          idLable='title'
          label='Enter Title'
        />
        <Field 
          inputType='text' 
          name='description' 
          component={this.renderLoginForm} 
          idLable='desc' 
          label='Enter Description'          
        />
        <Field 
          inputType='select' 
          name='status' 
          component={this.renderLoginForm} 
          idLable='status' 
          label='Select Post Status'          
        />
        <button className="ui button primary" >Submit</button>
      </form>
      </div>      
    )
  }
}


const validate = formValues => {
  const errors = {};
  
  if(!formValues.title){
    errors.title = "no title!!!";
    
  }
  /* let limitLength = formValues.username.length;
  if(limitLength){
    errors.username = "less than defiened limit";
  }
 */
  if(!formValues.description){
    errors.description = "no description!!!";
  }

  if(!formValues.status){
    errors.status = "Select status!!!";
  }

  return errors;
};


/* reduxForm returns a function and we 
immediately pass that function to class StreamCreate */
 const postRedux = reduxForm({
    form: 'postCreateForm',
    validate
  })(PostCreate);

  export default connect(null,{postCreate})(postRedux);

