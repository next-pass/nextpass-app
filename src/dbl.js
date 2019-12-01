import {userSession} from './blockstack-config';

import uuid from './utils/rnd';

const FILE_PATH = 'entries.db';

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

  const newEntries = [...entries, newEntry];

  return userSession.putFile(FILE_PATH, JSON.stringify(newEntries), {encrypt: true});
};


export const updateEntry = async (id, props) => {
  let entries = await getEntries();

  const theEntry = entries.find(x => x._id === id);

  if (!theEntry) {
    throw new Error('Entry not found!');
  }

  const rest = entries.filter(x => x._id !== id);

  const updated = Object.assign({}, theEntry, {updated: new Date().getTime()}, props);

  const newEntries = [updated, ...rest];

  return userSession.putFile(FILE_PATH, JSON.stringify(newEntries), {encrypt: true});
};

export const deleteEntry = async (id) => {
  let entries = await getEntries();

  const newEntries = entries.filter(x => x._id !== id);

  return userSession.putFile(FILE_PATH, JSON.stringify(newEntries), {encrypt: true});
};