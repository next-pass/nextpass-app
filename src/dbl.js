import {userSession} from './blockstack-config';

import uuid from './utils/rnd';

const FILE_PATH = 'entries.dbx';

export const save = async (data) => {
  return userSession.putFile(FILE_PATH, JSON.stringify(data), {encrypt: true});
};

export const getEntries = () => {
  return userSession.getFile(FILE_PATH).then(resp => JSON.parse(resp));
};

export const addEntry = async (props) => {
  const now = new Date().getTime();
  const newEntry = {'_id': uuid(), createdAt: now, updatedAt: now, ...props};

  let entries = await getEntries();
  if (!entries) {
    entries = [];
  }

  return save(_add(entries, newEntry));
};

export const updateEntry = async (id, props) => {
  let entries = await getEntries();

  const theEntry = entries.find(x => x._id === id);

  if (!theEntry) {
    throw new Error('Entry not found!');
  }

  const newProps = Object.assign({}, theEntry, {updated: new Date().getTime()}, props);

  return save(_update(entries, id, newProps));
};

export const deleteEntry = async (id) => {
  let entries = await getEntries();

  return save(_delete(entries, id));
};


export const _add = (list, newItem) => {
  return [...list, newItem]
};


export const _update = (list, id, newProps) => {
  const rest = list.filter(x => x._id !== id);

  const updated = Object.assign({}, newProps);

  return [updated, ...rest]
};


export const _delete = (list, id) => {
  return list.filter(x => x._id !== id)
};

