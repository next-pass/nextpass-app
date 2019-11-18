import pass from "./pass"

it('1- lowercase ', () => {
  const result = pass(32, {lower: true});
  expect(typeof result === 'string' && result.length === 32).toBe(true);
});

it('2- lowercase + uppercase ', () => {
  const result = pass(32, {lower: true, upper: true});
  expect(typeof result === 'string' && result.length === 32).toBe(true);
});


it('3- lowercase + uppercase + numbers ', () => {
  const result = pass(32, {lower: true, upper: true, numbers: true});
  expect(typeof result === 'string' && result.length === 32).toBe(true);
});


it('3- lowercase + uppercase + numbers + symbols ', () => {
  const result = pass(32, {lower: true, upper: true, numbers: true, symbols: true});
  expect(typeof result === 'string' && result.length === 32).toBe(true);
});

it('4- lowercase + uppercase + numbers + symbols + excludeSimilar ', () => {
  const result = pass(32, {lower: true, upper: true, numbers: true, symbols: true, excludeSimilar: true});
  expect(typeof result === 'string' && result.length === 32).toBe(true);
});

it('4- lowercase + uppercase + numbers + symbols + excludeSimilar + excludeAmbiguous ', () => {
  const result = pass(32, {
    lower: true,
    upper: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
    excludeAmbiguous: true
  });
  expect(typeof result === 'string' && result.length === 32).toBe(true);
});
