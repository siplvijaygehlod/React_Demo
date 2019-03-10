import  wp from '../apis/wp'
 import {
  FETCH_POSTS,
  FETCH_POST,
  FETCH_USER
} from './types';

/* Test SignIn
username: vijay
password: vijay
*/
import history from "../history"
import {toastr} from 'react-redux-toastr'

 

const toastrSuccessFunction = (title,msg) => toastr.success(title,msg)
const toastrWarningFunction = (title,msg) => toastr.error(title,msg) 

export const loginUserAction = formValues => async (dispatch) => {
    try{
      let header = {
        "Content-Type" : "application/json"
      }
      const response  = await wp.post('/jwt-auth/v1/token',{...formValues},{header:header});
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("loggedInUserId", response.data.user_id);
      history.push('/');
      toastrSuccessFunction(`SignIn Successful`,`${formValues.username}`)
    }
    catch(error){
      toastrWarningFunction(`SignIn Failed`,`${formValues.username}`);
    }     
  };

  export const registerUserAction = formValues => async (dispatch) => {
    try{
      const response  = await wp.post('wp/v2/users/register',{...formValues});
      toastrSuccessFunction(`${response.data.message}`,`${formValues.username}`)
      history.push('/'); 
    }
    catch(error){
      toastrWarningFunction(`Registeration Failed`,`${formValues.username}`);
    }   
  };

  export const logOutUserAction = () => {
    localStorage.removeItem("loggedInUserId")
    localStorage.removeItem("authToken");

    toastrSuccessFunction(`LogOut Status`,`You are logout Successfully`);
  };

  export const getLoggedInUserDetailAction = id => async (dispatch) => {
    try{
      let header = {
        "Content-Type" : "application/json",
        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
      }
      const response  = await wp.put(`wp/v2/users/${id}`,{header:header});
      console.log(response.data);
      dispatch({type: FETCH_USER,payload:response.data})
    }catch(error){
      toastrWarningFunction(`User Details`,`User Data Not Found`);
    }  
    //dispatch({type: SIGN_IN,payload:response.data})
  };

  export const updateUserAction = formValues => async (dispatch) => {
    try{
      let header = {
        "Content-Type" : "application/json",
        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
      }
      const response  = await wp.put(`wp/v2/users/${formValues.id}`,{...formValues},{header:header});
      console.log(response.data.message);
    }catch(error){
      toastrWarningFunction(`Update User Faield`,`${formValues.username}`);
    }  
    //dispatch({type: SIGN_IN,payload:response.data})
  };

  export const postCreateAction = formValues => async (dispatch) => {
    try{
      let header = {
        "Content-Type" : "application/json",
        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
      }
      console.log(header)
      console.log(typeof formValues.status)
      const response  = await wp.post('/wp/v2/posts',formValues,{header:header});
      console.log(response)
    }catch(error){
      toastrWarningFunction(`Create Post Error`,`${formValues.title}`);
    }  
  };
  
  export const postList = ()=> async (dispatch) => {
    try{
      let header = {
        "Content-Type" : "application/json",
        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
      }
      const response  = await wp.get('/wp/v2/posts',{header:header});
      //console.log(response.data)
      dispatch({type: FETCH_POSTS,payload:response.data})
    }catch(error){
      toastrWarningFunction(`Form Submission Error`,`a`);
    }  
  };
  
  export const postView = (id)=> async (dispatch) => {
    try{
      let header = {
        "Content-Type" : "application/json",
        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
      }
      //console.log(header)
      const response  = await wp.get(`/wp/v2/posts/${id}`,{header:header});
      //console.log(response.data)
      dispatch({type: FETCH_POST,payload:response.data})
    }catch(error){
      toastrWarningFunction(`Form Submission Error`,`a`);
    }  
  };

  export const deletePostAction = (id)=> async (dispatch) => {
    try{
      let localStorageData = localStorage.getItem("authToken");
      let header = {
        "Content-Type" : "application/json",
        Authorization:`Bearer ${localStorageData}`
      }
      console.log(header)
      const response  = await wp.delete(`/wp/v2/posts/${id}`,{header:header});
      console.log(response.data)
      history.push('/'); 
      //dispatch({type: FETCH_POST,payload:response.data})
    }catch(error){
      toastrWarningFunction(`Post Delete Task`,`Error`);
      history.push('/'); 
    }  
  };

  /* 
  
 { "email": "a@g.c",
"first_name": "a",
"last_name": "a",
"password": "a",
"username": "a"}
*/