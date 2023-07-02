import { simpleCalculator, Action } from './index';

const testCases = [
  {
    name: 'should add two numbers',
    a: 10,
    b: 5,
    action: Action.Add,
    expected: 15,
  },
  {
    name: 'should subtract two numbers',
    a: 10,
    b: 5,
    action: Action.Subtract,
    expected: 5,
  },
  {
    name: 'should multiply two numbers',
    a: 10,
    b: 5,
    action: Action.Multiply,
    expected: 50,
  },
  {
    name: 'should divide two numbers',
    a: 10,
    b: 5,
    action: Action.Divide,
    expected: 2,
  },
  {
    name: 'should exponentiate two numbers',
    a: 10,
    b: 5,
    action: Action.Exponentiate,
    expected: 100000,
  },
  {
    name: 'should return null for invalid action',
    a: 10,
    b: 5,
    action: '>',
    expected: null,
  },
  {
    name: 'should return null for invalid arguments',
    a: '10',
    b: 5,
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
