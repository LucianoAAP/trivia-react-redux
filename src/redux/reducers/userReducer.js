import { LOGIN } from '../actions/actionChangeLogin';
import { GET_USER_TRIVIA,
  GET_USER_TRIVIA_SUCESS,
  GET_USER_TRIVIA_ERROR,
} from '../actions/fetchUserTrivia';
import { CHANGE_URL } from '../actions/changeUrl';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  url: 'https://opentdb.com/api.php?amount=5',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };
  case GET_USER_TRIVIA:
    return { ...state };
  case GET_USER_TRIVIA_SUCESS:
    return {
      ...state,
      token: action.payload.token,
      url: `${state.url}&token=${action.payload.token}`,
    };
  case GET_USER_TRIVIA_ERROR:
    return { ...state, token: action.payload.error };
  case CHANGE_URL:
    return { ...state, url: action.payload };
  default: return state;
  }
};

export default userReducer;
