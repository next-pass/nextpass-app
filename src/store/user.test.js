import reducer, {
  loginAct,
  logOutAct
} from './user';

let state = undefined;

it('1- default', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});


it('2- login', () => {
  const act = loginAct({username: 'username', image: 'https://foo.com/bar.jpg'});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('4- logout', () => {
  const act = logOutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});
