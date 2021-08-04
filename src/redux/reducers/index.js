import { combineReducers } from 'redux';
import user from './user';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({ user, questionReducer });

export default rootReducer;
