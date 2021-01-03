/* eslint-disable import/no-anonymous-default-export */
import {
    GET_KIDS,
    GET_KID, 
    KIDS_ERROR, 
    SET_LOADING,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../actions/types';

const initialState = {
    kids: null,
    loading: false,
    error: null,
    current: null
};

export default(state = initialState, action) => {
    switch(action.type) {
        case GET_KIDS:
            return {
                ...state,
                kids: action.payload,
                loading: false
            }
        case GET_KID:
            return {
                ...state,
                kids: state.kids.map(kid => kid.kid_id === action.payload ? action.payload : kid),
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case KIDS_ERROR:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}