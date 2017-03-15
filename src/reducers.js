import mori from 'mori';
import { getDefaultsFromArrayOfObjects } from './utilities';
import { initialState } from './initialState';
import uuid from 'node-uuid';

// For logging mori data structures.
const log = (...args) => console.log(...args.map(mori.toJs));

const makeDefaultDance = (danceMenusData) => {
    let menuDefaults = getDefaultsFromArrayOfObjects(mori.toJs(danceMenusData)),
        nonMenuDefaults = {
            title: '',
            authors: '',
            notesMusic: '',
            notesCalling: '',
            notesTeaching: '',
            notesOther: '',
            figures: [
                // just for reference...
                // { type: 'circle', direction: 'Left', duration: 8 },
                // { type: 'swing', who: 'partners' },
                // { type: 'allemande', direction: 'Left', who: 'neighbors', duration: 8, howFar: 1.5 }
            ]
        },
        result = Object.assign({}, menuDefaults, nonMenuDefaults);
    return result;
};

export var getStartEnd = (figures, duration) => {
    let lastFig = mori.last(figures),
        prevEndBeat = lastFig ? mori.get(lastFig, 'endBeat') : 0,
        result = mori.hashMap('startBeat', prevEndBeat + 1, 'endBeat', prevEndBeat + duration);
    return result;
};

var refreshStartsEnds = (figures) => {
    let updateStartEnd = (result, fig) => {
        let duration = mori.getIn(fig, ['duration', 'value']),
            startEnd = getStartEnd(result, duration),
            newFig = mori.conj(result, mori.merge(fig, startEnd));
        return newFig;
    };
    let newFigs = mori.reduce(updateStartEnd, mori.vector(), figures);
    return newFigs;
};

// MORI HELPERS

// removes an item from a mori vector at the given index
const vectorRemove = (coll, index) => mori.into(
    mori.subvec(coll, 0, index),
    mori.subvec(coll, index + 1)
);

// works on hashMaps, incoming and target are hashMaps
const mergeIn = (coll, path, incoming) => mori.updateIn(
    coll, path,
    target => mori.merge(target, incoming)
);

const removeIn = (coll, path, key) => {
    let someMap = mori.getIn(coll, path);
    let poppedPath = mori.pop(path);
    return mori.assocIn(coll, poppedPath, someMap);
};

// REDUCER FUNCTIONS

const switchUiMode = (state, action) => {
    let newMode = action.payload;
    return mori.assocIn(state, ['uiState', 'mode'], newMode);
};

const addNewDance = (state, action) => {
    let dances = mori.get(state, 'dances'),
        id = uuid.v4(),
        danceMenusData = mori.get(state, 'danceMenusData'),
        newDances = mori.conj(dances, mori.hashMap(id, mori.toClj(makeDefaultDance(danceMenusData)))),

        // TODO: this might be more elegant?
        state1 = mori.assoc(state, 'dances', newDances),
        state2 = mori.assocIn(state1, ['uiState', 'currentDance'], id),
        state3 = mori.assocIn(state2, ['uiState', 'mode'], 'editDance');
    return state3;
};

const editDance = (state, action) => {
    let id = action.payload,
        state1 = mori.assocIn(state, ['uiState', 'currentDance'], id),
        state2 = mori.assocIn(state1, ['uiState', 'mode'], 'editDance');
    return state2;
};

const deleteDance = (state, action) => {
    let id = action.payload,
        dances = mori.get(state, 'dances'),
        newDances = mori.dissoc(dances, id),
        newState = mori.assoc(state, 'dances', newDances);
    return newState;
};

const setDanceProperty = (state, action) => {
    let { prop, value, hasLabel } = action.payload,
        currentDance = mori.getIn(state, ['uiState', 'currentDance']),
        newValue;

    if (hasLabel) {
        // get the label to use when we re-render
        let predicate = (item) => mori.equals(value, mori.get(item, 'value')),
            label = mori.get(mori.some(predicate), 'value');
        newValue = mori.hashMap('value', value, 'label', label);
    } else {
        newValue = value;
    }
    return mori.assocIn(state, ['dances', currentDance, prop], newValue);
};

const addFigure = (state, action) => {
    // console.log("reducer add figure", action.payload);
    // console.log("state in reducer", state);
    let figureDefaults = mori.toClj(action.payload),
        duration = mori.getIn(figureDefaults, ['duration', 'value']),
        currentDance = mori.getIn(state, ['uiState', 'currentDance']),
        figures = mori.getIn(state, ['dances', currentDance, 'figures']),
        // TODO: modify swing defaults (who, duration) if preceded by a balance
        newFig = mori.merge(figureDefaults, getStartEnd(figures, duration)),
        newFigs = mori.conj(figures, newFig),
        newState = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigs);
    return newState;
};

const modifyFigure = (state, action) => {
    let { figureIndex, keyProp, value } = action.payload,
        currentDance = mori.getIn(state, ['uiState', 'currentDance']),
        figures = mori.getIn(state, ['dances', currentDance, 'figures']),

        label = mori.get(mori.some(item => mori.equals(value, mori.get(item, 'value'))), 'value'),
        valueLabel = mori.hashMap('value', value, 'label', label),

        newFigs1 = mergeIn(figures, [figureIndex, keyProp], valueLabel),
        newFigs2 = 'duration' === keyProp ? refreshStartsEnds(newFigs1) : newFigs1,
        newState = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigs2);
    return newState;
};

const deleteFigure = (state, action) => {
    let figureIndex = action.payload,
        currentDance = mori.getIn(state, ['uiState', 'currentDance']),
        figures = mori.getIn(state, ['dances', currentDance, 'figures']),
        oneLessFigure = vectorRemove(figures, figureIndex),
        newFigures = refreshStartsEnds(oneLessFigure),
        result = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigures);
    // console.log('DELETE result', mori.toJs(mori.getIn(result, ['dances', mori.getIn(state, ['uiState', 'currentDance']), 'figures'])));
    return result;
};

// MAIN REDUCER CODE

const reducerLookup = {
    'SWITCH_UI_MODE': switchUiMode,

    'ADD_NEW_DANCE': addNewDance,
    'EDIT_DANCE': editDance,
    'DELETE_DANCE': deleteDance,

    'SET_DANCE_PROPERTY': setDanceProperty,

    'ADD_FIGURE': addFigure,
    'MODIFY_FIGURE': modifyFigure,
    'DELETE_FIGURE': deleteFigure
};

export default function(
        state = mori.toClj(initialState),
        action = { type: 'NONE' }
    ) {

    log('reducer', action, state);
    const reducerFunction = reducerLookup[action.type];
    if (reducerFunction) {
        return reducerFunction(state, action);
    } else {
        console.warn("Unknown action: " + action.type);
        return state;
    }
}
