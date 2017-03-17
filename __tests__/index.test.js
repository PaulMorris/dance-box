import { fromJS, Map } from 'immutable';

// toBe is ===
// toEqual is recursively checking values in arrays and objects

test('adds 1 + 1 to equal 2, just testing the testing setup', () => {
  expect(1 + 1).toBe(2);
});

import { getStartEnd } from '../src/reducers';

var figures = fromJS([
    { type: 'Circle', direction: 'Left', duration: 8, startBeat: 0, endBeat: 8 },
    { type: 'Swing', who: 'partners', duration: 16, startBeat: 9, endBeat: 24 },
    { type: 'Allemande', direction: 'Left', who: 'neighbors', duration: 8, howFar: 1.5, startBeat: 25, endBeat: 32}
]);

// Is there a way to pass in arguments ('figures') to a jest test?  Why isn't
// this the idiomatic way to do it?
test('getStartEnd function', () => {
    let result = getStartEnd(figures, 8).toJS();
    expect(result).toEqual(
        Map({'startBeat': 33, 'endBeat': 40}).toJS()
    );
    expect(result.startBeat).toBe(33);
    expect(result.endBeat).toBe(40);
});

import { initialState } from '../src/initialState';

let figureTypes = initialState.figureTypes;
let figKeys = Object.keys(figureTypes);

test('all figure button data includes duration', () => {
    let noDuration = figKeys.filter(key => figureTypes[key].duration === undefined);
    expect(noDuration).toEqual([]);
});

test('all figure button properties have a default', () => {
    let aFigWithoutDefault = figKeys.find(key => {
        let fig = figureTypes[key];

        return Object.keys(fig).find(key2 => {
            let prop = fig[key2];

            let objectsWithDefaultPropTrue = prop.filter(obj => obj.default === true);
            return objectsWithDefaultPropTrue.length !== 1;
        });
    });
    expect(aFigWithoutDefault).toEqual(undefined);
});
