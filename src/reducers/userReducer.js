//import _ from 'lodash';
import {
    //FETCH_USER,
    FETCH_PAGES
} from '../actions/types';

export default (state = {},action) => {
    switch(action.type){
        case FETCH_PAGES:
            return {...state, [action.payload.id]:action.payload};
        default:
            return state;
    }
}