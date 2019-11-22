import to from 'await-to-js';

import {USER_LOGOUT} from './user';

import {Entry} from '../model';

import {ENTRY_STATUS_ON} from '../constants';

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
      return Object.assign({}, state, {loading: false, list: entries.map(x => ({...x.attrs}))});
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

  const filter = {status: ENTRY_STATUS_ON, sort: '-createdAt'};
  const [err, entries] = await to(Entry.fetchOwnList(filter));

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
