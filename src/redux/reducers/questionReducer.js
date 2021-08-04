import { FETCH_QUESTIONS_API, ERROR_QUESTIONS_FETCH } from '../actions/questionsApiAct';

const INIT_STATE = {
  apiResult: [],
  error: '',
};

const questionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  case FETCH_QUESTIONS_API:
    return { ...state, apiResult: action.apiResult[0].results };

  case ERROR_QUESTIONS_FETCH:
    return { ...state, error: action.error };

  default: return state;
  }
};

export default questionReducer;
