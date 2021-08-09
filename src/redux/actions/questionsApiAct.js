export const FETCH_QUESTIONS_API = 'FETCH_QUESTIONS_API';
export const ERROR_QUESTIONS_FETCH = 'ERROR_QUESTIONS_FETCH';

export const fetchAction = (json) => ({ type: FETCH_QUESTIONS_API, apiResult: [json] });

export const fetchError = (error) => ({ type: ERROR_QUESTIONS_FETCH, error });

export const fetchQuestion = (url) => async (dispatch) => {
  try {
    const resp = await fetch(url);
    const result = await resp.json();
    dispatch(fetchAction(result));
  } catch (error) {
    dispatch(fetchError(error));
  }
};
