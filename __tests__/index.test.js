import mori from 'mori';

// toBe is ===
// toEqual is recursively checking values in arrays and objects

test('adds 1 + 1 to equal 2, just testing the testing setup', () => {
  expect(1 + 1).toBe(2);
});

import { getStartEnd } from '../src/reducers';

var figures = mori.toClj([
    { type: 'Circle', direction: 'Left', duration: 8, startBeat: 0, endBeat: 8 },
    { type: 'Swing', who: 'partners', duration: 16, startBeat: 9, endBeat: 24 },
    { type: 'Allemande', direction: 'Left', who: 'neighbors', duration: 8, howFar: 1.5, startBeat: 25, endBeat: 32}
]);

// Is there a way to pass in arguments ('figures') to a jest test?  Why isn't
// this the idiomatic way to do it?
test('getStartEnd function', () => {
    let result = mori.toJs(getStartEnd(figures, 8));
    expect(result).toEqual(
        mori.toJs(mori.hashMap('startBeat', 33, 'endBeat', 40))
    );
    expect(result.startBeat).toBe(33);
    expect(result.endBeat).toBe(40);
});
