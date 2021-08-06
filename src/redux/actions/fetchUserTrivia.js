export const GET_USER_TRIVIA = 'GET_USER_TRIVIA';
export const GET_USER_TRIVIA_SUCESS = 'GET_USER_TRIVIA_SUCESS';
export const GET_USER_TRIVIA_ERROR = 'GET_USER_TRIVIA_ERROR';

export const getUserTrivia = () => ({ type: GET_USER_TRIVIA });

export const getUserTriviaSuccess = (payload) => ({
  type: GET_USER_TRIVIA_SUCESS,
  payload,
});

export const getUserTriviaError = (error) => ({
  type: GET_USER_TRIVIA_ERROR,
  error,
});

export const fetchUserTrivia = () => async (dispatch) => {
  dispatch(getUserTrivia());
  const endpointuser = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(endpointuser);
  const dataUserTrivia = await data.json();
  if (dataUserTrivia.response_code === 0) {
    dispatch(getUserTriviaSuccess(dataUserTrivia));
  } else if (!dataUserTrivia.results) {
    dispatch(getUserTriviaError(dataUserTrivia));
  }
};
