import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {getEntries} from '../dbl';

const initialState = {
  loading: false,
  list: [],
  selected: null
};

/* Action types */
export const FETCH = '@entries.js/FETCH';
export const FETCH_ERROR = '@entries.js/FETCH_ERROR';
export const FETCHED = '@entries.js/FETCHED';

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return Object.assign({}, state, {loading: true});
    case FETCHED:
      const {entries} = action.payload;
      return Object.assign({}, state, {loading: false, list: entries.sort((a, b) => b.createdAt - a.createdAt)});
    case FETCH_ERROR:
      return initialState;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}


/* Actions */
export const fetchEntries = () => async (dispatch) => {
  dispatch(fetchAct());

  const [err, entries] = await to(getEntries());

  if (err) {
    dispatch(fetchErrorAct());
    return
  }

  dispatch(fetchedAct(entries));

  return entries;
};


/* Action creators */
export const fetchAct = () => ({
  type: FETCH
});

export const fetchedAct = (entries) => ({
  type: FETCHED,
  payload: {
    entries
  }
});

export const fetchErrorAct = () => ({
  type: FETCH_ERROR
});
