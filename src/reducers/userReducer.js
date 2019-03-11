//import _ from 'lodash';
import {
    FETCH_USER
} from '../actions/types';

export default (state = {},action) => {
    switch(action.type){
        case FETCH_USER:
            return {...state, [action.payload.id]:action.payload};
        default:
            return state;
    }
}