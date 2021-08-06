import { combineReducers } from 'redux';
import userReducer from './userReducer';
import questionReducer from './questionReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({ userReducer, questionReducer, scoreReducer });

export default rootReducer;
