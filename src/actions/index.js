import  wp from '../apis/wp'
import  wpBearer from '../apis/wpBearer'

 import {
  FETCH_POSTS,
  FETCH_USER,
  DELETE_POST,
  UPDATE_POST,
  FETCH_PAGES
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
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("displayName", response.data.user_display_name);
      localStorage.setItem("loggedInUserId", response.data.user_id);
      history.push('/post/list/1');
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

  /* export const logOutUserAction = () => {
    localStorage.removeItem("loggedInUserId")
    localStorage.removeItem("authToken");

    toastrSuccessFunction(`LogOut Status`,`You are logout Successfully`);
  }; */

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
      history.push('/post/list/1'); 
    }catch(error){
      toastrWarningFunction(`Create Post Error`,`${formValues.title}`);
    }  
  };
  
  export const postListAction = (id)=> async (dispatch) => {
    try{

      let restApiSlug = `?order=desc&orderby=date&offset=${1 +((id-1)*10)}&page=${id}&per_page=10`;
      const response  = await wp.get(`/wp/v2/posts${restApiSlug}`);
      dispatch({type: FETCH_PAGES,payload:response.headers['x-wp-totalpages']})
      dispatch({type: FETCH_POSTS,payload:response.data})
    }catch(error){
      if(!localStorage.getItem("authToken")){
        toastrWarningFunction(`User Notice`,`Please SignIn to view post list`);
        history.push('/'); 
      }else{
        toastrWarningFunction(`List render Error`,`Can't get list`);
      }
    }  
  };
  
   export const postUpdateAction = (id,formValues)=> async (dispatch) => {
    try{
      const response  = await wpBearer.post(`/wp/v2/posts/${id}`,formValues);
      toastrSuccessFunction(`Post Update Successfully `,`${formValues.title}`);
      dispatch({type: UPDATE_POST,payload:response.data})
      //history.push('/post/list/1')
    }catch(error){
      toastrWarningFunction(`Post Update Error`,`${formValues.title}`);
    }  
  };

  export const deletePostAction = (id)=> async (dispatch) => {
    try{
      console.log(id)
      await wpBearer.delete(`/wp/v2/posts/${id}`);
      toastrSuccessFunction(`Post Deleted Successfully `,``);
      dispatch({type: DELETE_POST,payload:id})

      //history.push('/post/list/1'); 
    }catch(error){
      toastrWarningFunction(`Post Delete Error`,`Post Delete Task`);
      //history.push('/post/list/1'); 
    }  
  };