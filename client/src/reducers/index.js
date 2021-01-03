import { combineReducers } from 'redux';
import kidReducer from './kidReducer';

export default combineReducers({
    kid: kidReducer
});