import {USER_LOGOUT} from './user';

export const SET = '@next-pass/SET';
export const RESET = '@next-pass/RESET';


const initialState = localStorage.getItem('next-pass');

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case RESET:
      return null;
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
}

/* Actions */
export const setNextPass = (val) => async (dispatch) => {
  localStorage.setItem('next-pass', val);
  dispatch(setAct(val));
};

export const resetNextPass = () => async (dispatch) => {
  localStorage.removeItem('next-pass');
  dispatch(resetAct());
};


/* Action creators */
export const setAct = (val) => ({
  type: SET,
  payload: val
});


/* Action creators */
export const resetAct = (val) => ({
  type: RESET
});
