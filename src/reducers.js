import mori from 'mori';
import { getDefaultsFromArrayOfObjects } from './utilities';
import { initialState } from './initialState';

// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

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
}

export var getStartEnd = (figures, duration) => {
    let lastFig = mori.last(figures),
        prevEndBeat = lastFig ? mori.get(lastFig, 'endBeat') : 0;
    return mori.hashMap('startBeat', prevEndBeat + 1, 'endBeat', prevEndBeat + duration);
};

var refreshStartsEnds = (figures) => {
    // log('before', figures);
    let updateStartEnd = (result, fig) => {
        let duration = mori.getIn(fig, ['duration', 'value']),
            startEnd = getStartEnd(result, duration),
            newFig = mori.conj(result, mori.merge(fig, startEnd));
        return newFig;
    };
    let newFigs = mori.reduce(updateStartEnd, mori.vector(), figures);
    // log('after', newFigs);
    return newFigs;
};

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

export default function(state = mori.toClj(initialState), action) {
    log('reducer', action, state);

    if ('ADD_FIGURE' === action.type) {
        // console.log("reducer add figure", action.payload);
        // console.log("state in reducer", state);
        let figureDefaults = mori.toClj(action.payload),
            duration = mori.getIn(figureDefaults, ['duration', 'value']),
            currentDance = mori.get(state, 'currentDance'),
            figures = mori.getIn(state, ['dances', currentDance, 'figures']),
            // TODO: modify swing defaults (who, duration) if preceded by a balance
            newFig = mori.merge(figureDefaults, getStartEnd(figures, duration)),
            newFigs = mori.conj(figures, newFig),
            newState = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigs);
        return newState;

    } else if ('MODIFY_FIGURE' === action.type) {
        let {type, figureIndex, keyProp, value} = action.payload,
            currentDance = mori.get(state, 'currentDance'),
            figures = mori.getIn(state, ['dances', currentDance, 'figures']),

            label = mori.get(mori.some(item => mori.equals(value, mori.get(item, 'value'))), 'value'),
            valueLabel = mori.hashMap('value', value, 'label', label),

            newFigs1 = mergeIn(figures, [figureIndex, keyProp], valueLabel),
            newFigs2 = 'duration' === keyProp ? refreshStartsEnds(newFigs1) : newFigs1,
            newState = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigs2);
        return newState;

    } else if ('DELETE_FIGURE' === action.type) {
        let figureIndex = action.payload.figureIndex,
            currentDance = mori.get(state, 'currentDance'),
            figures = mori.getIn(state, ['dances', currentDance, 'figures']),
            oneLessFigure = vectorRemove(figures, figureIndex),
            newFigures = refreshStartsEnds(oneLessFigure),
            result = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigures);
        // console.log('DELETE result', mori.toJs(mori.getIn(result, ['dances', mori.get(state, 'currentDance'), 'figures'])));
        return result;

    } else if ('ADD_NEW_DANCE' === action.type) {
        let dances = mori.get(state, 'dances'),
            id = uid(),
            danceMenusData = mori.get(state, 'danceMenusData'),
            newDances = mori.conj(dances, mori.hashMap(id, mori.toClj(makeDefaultDance(danceMenusData)))),

            // TODO: this might be more elegant?
            state1 = mori.assoc(state, 'dances', newDances),
            state2 = mori.assoc(state1, 'currentDance', id),
            state3 = mori.assocIn(state2, ['uiState', 'mode'], 'editDance');
        return state3;

    } else if ('SET_DANCE_PROPERTY' === action.type) {
        let {prop, value} = action.payload,
            currentDance = mori.get(state, 'currentDance');
        return mori.assocIn(state, ['dances', currentDance, prop], value);

    } else if ('SET_DANCE_MENU_PROPERTY' === action.type) {
        let {prop, value} = action.payload,
            currentDance = mori.get(state, 'currentDance'),

            label = mori.get(mori.some(item => mori.equals(value, mori.get(item, 'value'))), 'value'),
            valueLabel = mori.hashMap('value', value, 'label', label),
            newState = mori.assocIn(state, ['dances', currentDance, prop], valueLabel);
        return newState;


    } else if ('EDIT_DANCE' === action.type) {
        console.log('payload', action.payload);
        let id = action.payload;
        let state1 = mori.assoc(state, 'currentDance', id);
        let state2 = mori.assocIn(state1, ['uiState', 'mode'], 'editDance');
        return state2;

    } else if ('SWITCH_UI_MODE' === action.type) {
        let newMode = action.payload;
        return mori.assocIn(state, ['uiState', 'mode'], newMode);

    } else {
        return state;
    }
}
