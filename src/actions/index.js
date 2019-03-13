import  wp from '../apis/wp'
import  wpBearer from '../apis/wpBearer'

 import {
  FETCH_POSTS,
  FETCH_USER,
  DELETE_POST,
  UPDATE_POST
} from './types';

/* Test SignIn
username: Vijay2207@
password: Vijay2207@
*/

import history from "../history"
import {toastr} from 'react-redux-toastr'

const toastrSuccessFunction = (title,msg) => toastr.success(title,msg)
const toastrWarningFunction = (title,msg) => toastr.error(title,msg) 

export const loginUserAction = formValues => async () => {
    try{
      const response  = await wp.post('/jwt-auth/v1/token',{...formValues});
      console.log(response.data.user_display_name)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("displayName", response.data.user_display_name);
      localStorage.setItem("loggedInUserId", response.data.user_id);
      history.push('/');
      toastrSuccessFunction(`SignIn Successful`,`${formValues.username}`)
    }
    catch(error){
      toastrWarningFunction(`SignIn Failed`,`${formValues.username}`);
    }     
  };

  export const registerUserAction = formValues => async (dispatch) => {
    console.log(formValues)
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
      const response  = await wpBearer.put(`wp/v2/users/${id}`);
      console.log(response.data);
      dispatch({type: FETCH_USER,payload:response.data})
    }catch(error){
      toastrWarningFunction(`User Details`,`User Data Not Found`);
    }  
  };

  export const updateUserAction = formValues => async (dispatch) => {
    try{
      const response  = await wp.put(`wp/v2/users/${formValues.id}`,{...formValues});
      console.log(response.data.message);
    }catch(error){
      toastrWarningFunction(`Update User Faield`,`${formValues.username}`);
    }  
  };

  export const postCreateAction = formValues => async () => {
    try{
      await wpBearer.post('/wp/v2/posts',formValues);
      toastrSuccessFunction(`Post Create Successfully `,`${formValues.title}`);
      history.push('/'); 
    }catch(error){
      toastrWarningFunction(`Create Post Error`,`${formValues.title}`);
    }  
  };
  
  export const postListAction = ()=> async (dispatch) => {
    try{
      //let rest_api_slug = `?order=asc&orderby=date&per_page=25`
      //let per_page = 10;
      const response  = await wp.get(`/wp/v2/posts`);
      //console.log(response.data)
      dispatch({type: FETCH_POSTS,payload:response.data})
    }catch(error){
      toastrWarningFunction(`List render Error`,`Can't get list`);
    }  
  };
  
   export const postUpdateAction = (id,formValues)=> async (dispatch) => {
    try{
      const response  = await wpBearer.post(`/wp/v2/posts/${id}`,formValues);
      //console.log(response.data)
      toastrSuccessFunction(`Post Update Successfully `,`${formValues.title}`);
      dispatch({type: UPDATE_POST,payload:response.data})
      history.push('/')
    }catch(error){
      toastrWarningFunction(`Post Update`,`${formValues.title}`);
    }  
  };

  export const deletePostAction = (id)=> async (dispatch) => {
    try{
      await wpBearer.delete(`/wp/v2/posts/${id}`);
      dispatch({type: DELETE_POST,payload:id})
      history.push('/'); 
    }catch(error){
      toastrWarningFunction(`Error`,`Post Delete Task`);
      history.push('/'); 
    }  
  };