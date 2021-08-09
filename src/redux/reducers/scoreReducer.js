import { INCREASE_SCORE, RESET_SCORE } from '../actions/changeScore';

const INITIAL_STATE = { score: 0 };

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    return { ...state, score: state.score + action.payload };
  case RESET_SCORE:
    return { ...state, score: 0 };
  default:
    return state;
  }
};

export default scoreReducer;
