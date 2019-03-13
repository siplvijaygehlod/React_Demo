import _ from 'lodash';
import {
    FETCH_POSTS,
    DELETE_POST,
    UPDATE_POST
} from '../actions/types';

export default (state = {},action) => {
    switch(action.type){
         
        case FETCH_POSTS:
            //console.log(action.payload)
            state= {}
            return {...state, ..._.mapKeys(action.payload,'id')};
        case DELETE_POST:
            return _.omit(state,action.payload);
        case UPDATE_POST:
            return {...state, [action.payload.id]:action.payload};
        default:
            return state;
    }
}