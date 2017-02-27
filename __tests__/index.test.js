// toBe is ===
// toEqual is recursively checking values in arrays and objects

test('adds 1 + 1 to equal 2, just testing the testing setup', () => {
  expect(1 + 1).toBe(2);
});

import { addFigure } from '../src/actions';

// let addFigure = require('../src/actions');

test('addFigure action function', () => {
    let result = addFigure('data');
    expect(result).toEqual({
        type: "ADD_FIGURE",
        payload: 'data'
    })
});
