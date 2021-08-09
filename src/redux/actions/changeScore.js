export const INCREASE_SCORE = 'INCREASE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const increaseScore = (payload) => ({ type: INCREASE_SCORE, payload });
export const resetScore = () => ({ type: RESET_SCORE });
