import {USER_LOGOUT} from './user';

export const TOGGLE_PASS_DIALOG = '@ui/TOGGLE_PASS_MODAL';

const initialState = {
  passDialog: false
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return initialState;
    case TOGGLE_PASS_DIALOG:
      return Object.assign({}, state, {passDialog: action.payload.what});
    default:
      return state;
  }
}

/* Actions */

export const toggleUiProp = (what) => {
  return async (dispatch, getState) => {
    const {ui} = getState();

    let act;

    switch (what) {
      case 'passDialog':
        act = TOGGLE_PASS_DIALOG;
        break;
      default:
        act = '';
        break;
    }

    dispatch({
      type: act,
      payload: {what: !ui[what]}
    });
  }
};