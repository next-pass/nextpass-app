import {
  _add,
  _update,
  _delete
} from './dbl';

let state = undefined;

it('1- _add', () => {
  state = _add([], {_id: '1', name: 'foo'});
  expect(state).toMatchSnapshot();
});

it('2- _add', () => {
  state = _add(state, {_id: '2', name: 'bar'});
  expect(state).toMatchSnapshot();
});

it('3- _add', () => {
  state = _add(state, {_id: '3', name: 'baz'});
  expect(state).toMatchSnapshot();
});


it('4- update', () => {
  state = _update(state, '2', {name: 'lorem ipsum', notes: 'foo bar baz'});
  expect(state).toMatchSnapshot();
});


it('5- delete', () => {
  state = _delete(state, '1');
  expect(state).toMatchSnapshot();
});
