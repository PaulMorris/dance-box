import mori from 'mori';
import { getDefaultsFromArrayOfObjects } from './utilities';

// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

const log = (...args) => console.log(...args.map(mori.toJs));

const initialState = mori.toClj({
  dances: {},
  currentDance: '',
  danceMenusData: {
      type: [
          {value: 'Contra', label: 'Contra', default: true},
          {value: 'Square', label: 'Square'},
          {value: 'CircleMixer', label: 'Circle Mixer'},
          {value: 'ScatterMixer', label: 'Scatter Mixer'},
          {value: 'Longways', label: 'Longways'},
          {value: 'ECD', label: 'English Country'},
          {value: 'Other', label: 'Other'}
      ],
      form: [
          {value: 'Improper', label: 'Improper', default: true},
          {value: 'Proper', label: 'Proper'},
          {value: 'Becket', label: 'Becket'},
          {value: 'Indecent', label: 'Indecent'}
      ],
      formation: [
          {value: 'Duple Minor', label: 'Duple Minor', default: true},
          {value: 'Triple Minor', label: 'Triple Minor'},
          {value: 'Triplet', label: 'Triplet'},
          {value: 'Quadruplet', label: 'Quadruplet'},
          {value: 'FourFacingFour', label: 'Four Facing Four'},
          {value: 'Tempest', label: 'Tempest'},
          {value: 'Square', label: 'Square'},
          {value: 'Break', label: 'Break'},
          {value: 'Other', label: 'Other'}
      ],
      progression: [
          {value: 1, label: 'Single Progression', default: true},
          {value: 2, label: 'Double Progression'},
          {value: 3, label: 'Triple Progression'},
          {value: 4, label: 'Quadruple Progression'}
      ],
      level: [
          {value: 'unsetLevel', label: 'Level Unset', default: true},
          {value: 'Beginner', label: 'Beginner Level'},
          {value: 'Novice', label: 'Novice Level'},
          {value: 'Intermediate', label: 'Intermediate Level'},
          {value: 'Advanced', label: 'Advanced Level'}
      ],
      mixedLevel: [
          {value: 'mixedLevelUnset', label: 'Mixed Level Unset', default: true},
          {value: 'mixedLevelFriendly', label: 'Mixed Level Friendly'},
          {value: 'mixedLevelUnfriendly', label: 'Mixed Level Unfriendly'}
      ],
      rating: [
          {value: '', label: 'Rating Unset', default: true},
          {value: 1, label: 'Rating: 1'},
          {value: 2, label: 'Rating: 2'},
          {value: 3, label: 'Rating: 3'},
          {value: 4, label: 'Rating: 4'},
          {value: 5, label: 'Rating: 5'}
      ]
  },

  figureTypes: {
      Circle: {
          direction: [
              {value: 'Left', label: 'Left', default: true},
              {value: 'Right', label: 'Right'}
          ],
          howFar: [
              {value: 1, label: '1 Place'},
              {value: 2, label: '2 Places'},
              {value: 3, label: '3 Places'},
              {value: 4, label: '4 Places', default: true},
              {value: 5, label: '5 Places'},
              {value: 6, label: '6 Places'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats', default: true},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      Star: {
          direction: [
              {value: 'Left', label: 'Left', default: true},
              {value: 'Right', label: 'Right'}
          ],
          howFar: [
              {value: 1, label: '1 Place'},
              {value: 2, label: '2 Places'},
              {value: 3, label: '3 Places'},
              {value: 4, label: '4 Places', default: true},
              {value: 5, label: '5 Places'},
              {value: 6, label: '6 Places'}
          ],
          hands: [
              {value: 'Wrist', label: 'Wrist Style', default: true},
              {value: 'HandsAcross', label: 'Hands Across Style'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats', default: true},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      Swing: {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats', default: true}
          ]
      },
      Balance: {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      Allemande: {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          howFar: [
              {value: 0.25, label: 'One Quarter'},
              {value: 0.5, label: 'Half Way'},
              {value: 0.75, label: 'Three Quarters'},
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      }
  }
});

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

export default function(state = initialState, action) {
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
            state2 = mori.assoc(state1, 'currentDance', id);
        return state2;

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
        return mori.assoc(state, 'currentDance', id);

    } else {
        return state;
    }
}
