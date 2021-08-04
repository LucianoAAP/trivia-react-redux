export const FETCH_QUESTIONS_API = 'FETCH_QUESTIONS_API';
export const ERROR_QUESTIONS_FETCH = 'ERROR_QUESTIONS_FETCH';

export const fetchAction = (json) => ({ type: FETCH_QUESTIONS_API, apiResult: [json] });

export const fetchError = (error) => ({ type: ERROR_QUESTIONS_FETCH, error });

export const fetchQuestion = (token) => async (dispatch) => {
  try {
    const resp = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await resp.json();
    dispatch(fetchAction(result));
  } catch (error) {
    dispatch(fetchError(error));
  }
};
