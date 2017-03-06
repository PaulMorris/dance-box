import mori from 'mori';

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
    });
});

import { getStartEnd } from '../src/reducers';

var figures = mori.toClj([
    { type: 'Circle', direction: 'Left', duration: 8 },
    { type: 'Swing', who: 'partners', duration: 16 },
    { type: 'Allemande', direction: 'Left', who: 'neighbors', duration: 8, howFar: 1.5 }
]);

test('getStartEnd function', (figures) => {
    let result = getStartEnd(figures, 8);
    expect(result).toEqual(
        mori.hashMap('startBeat', 33, 'endBeat', 40)
    );
});
