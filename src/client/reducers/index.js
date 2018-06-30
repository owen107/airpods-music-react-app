import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import authReducer from './authReducer';

export default combineReducers({
  common: commonReducer,
  auth: authReducer
});