import _ from 'lodash';
import {
    FETCH_POSTS,
    FETCH_POST,
    FETCH_USER
} from '../actions/types';

export default (state = {},action) => {
    switch(action.type){
/*         
        case CREATE_STREAM:
            return {...state, [action.payload.id]:action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]:action.payload};*/
        case FETCH_USER:
            return {...state, [action.payload.id]:action.payload};
        case FETCH_POSTS:
            //console.log(action.payload)
            return {...state, ..._.mapKeys(action.payload,'id')};
        case FETCH_POST:
            return {...state, [action.payload.id]:action.payload};
        default:
            return state;
    }
}