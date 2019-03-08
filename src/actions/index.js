import  wp from '../apis/wp'
/* import {
    SIGN_IN
} from './types'; */

/* Test SignIn
username: vijay
password: vijay
*/
import history from "../history"
import {toastr} from 'react-redux-toastr'
const header = {
  "Content-Type" : "application/json"
} 
const toastrSuccessFunction = (title,msg) => toastr.success(title,msg)
const toastrWarningFunction = (title,msg) => toastr.error(title,msg) 
export const loginUser = formValues => async (dispatch) => {
    try{
      const response  = await wp.post('jwt-auth/v1/token',{...formValues},{header:header});
      console.log(response.data)
      toastrSuccessFunction(`SignIn Successful`,`${formValues.username}`)
      localStorage.setItem("authToken", response.data.token);
      console.log(localStorage.getItem("authToken"))
      history.push('/'); 
    }
    catch(error){
      toastrWarningFunction(`Form Submission Error`,`${formValues.username}`);
    }     
  };

  export const registerUser = formValues => async (dispatch) => {
    try{
      const response  = await wp.post('wp/v2/users/register',{...formValues});
      toastrSuccessFunction(`${response.data.message}`,`${formValues.username}`)
      history.push('/'); 
    }
    catch(error){
      toastrWarningFunction(`Form Submission Error`,`${formValues.username}`);
    }   
    //dispatch({type: SIGN_IN,payload:response.data})
    //history.push('/'); 
  };

  export const updateUser = formValues => async (dispatch) => {
    //console.log(formValues);
    const response  = await wp.post('/wp/v2/users/register',{...formValues});
    console.log(response.data.message);
    //dispatch({type: SIGN_IN,payload:response.data})
    //history.push('/'); 
  };

  export const postCreate = formValues => async (dispatch) => {
    //console.log(formValues);
    const response  = await wp.post('/wp/v2/users/register',{...formValues});
    console.log(response.data.message);
    //dispatch({type: SIGN_IN,payload:response.data})
    //history.push('/'); 
  };

  /* 
  
 { "email": "a@g.c",
"first_name": "a",
"last_name": "a",
"password": "a",
"username": "a"}
*/