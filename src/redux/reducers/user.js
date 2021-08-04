import { LOGIN,
  GET_USER_TRIVIA,
  GET_USER_TRIVIA_SUCESS,
  GET_USER_TRIVIA_ERROR,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };
  case GET_USER_TRIVIA:
    return { ...state };
  case GET_USER_TRIVIA_SUCESS:
    return { ...state, token: action.payload.token };
  case GET_USER_TRIVIA_ERROR:
    return { ...state, token: action.payload.error };

  default: return state;
  }
};

export default user;
