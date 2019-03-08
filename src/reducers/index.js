import { combineReducers } from 'redux' 
import {reducer as toastrReducer} from 'react-redux-toastr'
/* This is form reducer which  is going to help us 
    in building the redux form. */
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  form: formReducer,
  toastr: toastrReducer
})
