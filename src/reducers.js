import { Map, List, Set, fromJS } from 'immutable';
import { getDefaultsFromArrayOfObjects, immLog } from './utilities';
import { initialState } from './initialState';
import { makeDanceCardContent } from './dance-card-content';
import uuid from 'node-uuid';

const makeDefaultDance = (danceMenusData) => {
    let menuDefaults = getDefaultsFromArrayOfObjects(danceMenusData.toJS()),
        nonMenuDefaults = {
            title: '',
            authors: '',
            notesMusic: '',
            notesCalling: '',
            notesTeaching: '',
            notesOther: '',
            autoDanceCard: '',
            danceCard: '',
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
    let lastFig = figures.last(),
        prevEndBeat = lastFig ? lastFig.get('endBeat') : 0,
        result = Map({ 'startBeat': prevEndBeat + 1, 'endBeat': prevEndBeat + duration });
    return result;
};

var refreshStartsEnds = (figures) => {
    let updateStartEnd = (result, fig) => {
        let duration = fig.getIn(['duration', 'value']),
            startEnd = getStartEnd(result, duration),
            newFig = result.push(fig.merge(startEnd));
        return newFig;
    };
    let newFigs = figures.reduce(updateStartEnd, List());
    return newFigs;
};

// REDUCER FUNCTIONS

const switchUiMode = (state, action) => {
    let newMode = action.payload;
    return state.setIn(['uiState', 'mode'], newMode);
};

const rebootState = (state, action) => fromJS(initialState);

const addNewDance = (state, action) => {
    let dances = state.get('dances'),
        id = uuid.v4(),
        danceMenusData = state.get('danceMenusData'),
        defaultDance = fromJS(makeDefaultDance(danceMenusData)),
        newDances = dances.set(id, defaultDance),

        // TODO: this might be more elegant?
        state1 = state.set('dances', newDances),
        state2 = state1.setIn(['uiState', 'currentDance'], id),
        state3 = state2.setIn(['uiState', 'mode'], 'editDance');
    return state3;
};

const editDance = (state, action) => {
    let id = action.payload,
        state1 = state.setIn(['uiState', 'currentDance'], id),
        state2 = state1.setIn(['uiState', 'mode'], 'editDance');
    return state2;
};

const deleteDance = (state, action) => {
    let id = action.payload,
        newState = state.deleteIn(['dances', id]);
    return newState;
};

const refreshDanceCard = (state, currentDance) => {
    let danceCard = makeDanceCardContent(state.getIn(['dances', currentDance]).toJS()),
        newState = state.setIn(['dances', currentDance, 'autoDanceCard'], danceCard);
    return newState;
};

const setDanceProperty = (state, action) => {
    let { prop, value, hasLabel } = action.payload,
        currentDance = state.getIn(['uiState', 'currentDance']),
        newValue;

    // TODO: are there any without labels?
    if (hasLabel) {
        // action.payload only has the value but not the label, so look it up
        let label = state.getIn(['danceMenusData', prop])
                     .find(item => item.get('value') === value)
                     .get('label');
        newValue = Map({ 'value': value, 'label': label });
    } else {
        newValue = value;
    }
    let newState = state.setIn(['dances', currentDance, prop], newValue);
    return refreshDanceCard(newState, currentDance);
};

const addFigure = (state, action) => {
    // console.log("reducer add figure", action.payload);
    // console.log("state in reducer", state);
    let figureDefaults = fromJS(action.payload),
        duration = figureDefaults.getIn(['duration', 'value']),
        currentDance = state.getIn(['uiState', 'currentDance']),
        figures = state.getIn(['dances', currentDance, 'figures']),
        // TODO: modify swing defaults (who, duration) if preceded by a balance
        newFig = figureDefaults.merge(getStartEnd(figures, duration)),
        newFigs = figures.push(newFig),
        newState = state.setIn(['dances', currentDance, 'figures'], newFigs);
    return refreshDanceCard(newState, currentDance);
};

const modifyFigure = (state, action) => {
    let { type, figureIndex, keyProp, value } = action.payload,
        currentDance = state.getIn(['uiState', 'currentDance']),
        figures = state.getIn(['dances', currentDance, 'figures']),

        // action.payload only has the value but not the label, so look it up
        label = state.getIn(['figureTypes', type, keyProp])
                     .find(item => item.get('value') === value)
                     .get('label'),
        valueLabel = Map({ 'value': value, 'label': label }),

        newFigs1 = figures.mergeIn([figureIndex, keyProp], valueLabel),
        newFigs2 = 'duration' === keyProp ? refreshStartsEnds(newFigs1) : newFigs1,
        newState = state.setIn(['dances', currentDance, 'figures'], newFigs2);
    return refreshDanceCard(newState, currentDance);
};

const deleteFigure = (state, action) => {
    let figureIndex = action.payload,
        currentDance = state.getIn(['uiState', 'currentDance']),
        figures = state.getIn(['dances', currentDance, 'figures']),
        oneLessFigure = figures.remove(figureIndex),
        newFigures = refreshStartsEnds(oneLessFigure),
        newState = state.setIn(['dances', currentDance, 'figures'], newFigures);
    return refreshDanceCard(newState, currentDance);
};

// MAIN REDUCER CODE

const reducerLookup = {
    'SWITCH_UI_MODE': switchUiMode,
    'REBOOT_STATE': rebootState,

    'ADD_NEW_DANCE': addNewDance,
    'EDIT_DANCE': editDance,
    'DELETE_DANCE': deleteDance,

    'SET_DANCE_PROPERTY': setDanceProperty,

    'ADD_FIGURE': addFigure,
    'MODIFY_FIGURE': modifyFigure,
    'DELETE_FIGURE': deleteFigure
};

export default function(state = fromJS(initialState), action = {type: 'NONE'}) {

    immLog('reducer', action, state);
    const reducerFunction = reducerLookup[action.type];
    if (reducerFunction) {
        return reducerFunction(state, action);
    } else {
        console.warn("Unknown action: " + action.type);
        return state;
    }
}
