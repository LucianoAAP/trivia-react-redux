import { combineReducers } from 'redux';
import user from './user';
import questionReducer from './questionReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({ user, questionReducer, scoreReducer });

export default rootReducer;
