import {
    GET_KIDS,
    GET_KID,
    SET_LOADING,
    KIDS_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT
} from './types';

//Get Kids
export const getKids = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch('http://localhost:7000/kids');
        const data = await res.json();

        dispatch({
            type: GET_KIDS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: KIDS_ERROR,
            payload: error.response.data
        });
    }
};

//get Kid
export const getKid = id => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`http://localhost:7000/kids/${id}`);
        const data = await res.json();

        dispatch({
            type: GET_KID,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: KIDS_ERROR,
            payload: error.response.data
        });
    }
};

//Set current log
export const setCurrent = kid => {
    return {
        type: SET_CURRENT,
        payload: kid
    }
}

//Clear current log
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    }
}

//Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};