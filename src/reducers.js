import mori from 'mori';

// succinct hack for generating passable unique ids
// const uid = () => Math.random().toString(34).slice(2);

const log = (...args) => console.log(...args.map(mori.toJs));

// dance title is the key
const emptyDance = {
    title: '',
    authors: '',
    type: 'Contra',
    form: 'Improper',
    formation: 'Duple Minor',
    progression: 'Single',
    level: 'Beginner',
    notesMusic: 'Reels not Jigs',
    notesCalling: 'Just do it',
    notesTeaching: 'End effects!',
    notesOther: 'Written on a train',
    rating: 5,
    figures: [
        // { type: 'circle', direction: 'Left', duration: 8 },
        // { type: 'swing', who: 'partners' },
        // { type: 'allemande', direction: 'Left', who: 'neighbors', duration: 8, howFar: 1.5 }
    ]
};

const oneToSixPlaces = [
    {value: 1, label: '1 Place'},
    {value: 2, label: '2 Places'},
    {value: 3, label: '3 Places'},
    {value: 4, label: '4 Places', default: true},
    {value: 5, label: '5 Places'},
    {value: 6, label: '6 Places'}
];

const initialState = mori.toClj({
  dances: {'A Demo Dance': emptyDance},
  currentDance: 'A Demo Dance',
  figureTypes: {
      Circle: {
          direction: [
              {value: 'Left', label: 'Left', default: true},
              {value: 'Right', label: 'Right'}
          ],
          howFar: oneToSixPlaces,
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
          howFar: oneToSixPlaces,
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

var getStartEnd = (figures, duration) => {
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
            newFig = mori.merge(figureDefaults, getStartEnd(figures, duration)),
            newFigs = mori.conj(figures, newFig),
            newState = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigs);
        return newState;

    } else if ('MODIFY_FIGURE' === action.type) {
        let {type, figureIndex, keyProp, value} = action.payload,

            currentDance = mori.get(state, 'currentDance'),
            figures = mori.getIn(state, ['dances', currentDance, 'figures']),

            propDefaults = mori.getIn(state, ['figureTypes', type, keyProp]),
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
            // toUpdate = newFigures.slice(figureIndex);
            result = mori.assocIn(state, ['dances', currentDance, 'figures'], newFigures);
        // console.log('DELETE result', mori.toJs(mori.getIn(result, ['dances', mori.get(state, 'currentDance'), 'figures'])));
        return result;


    } else if ('ADD_NEW_DANCE' === action.type) {
        // let dances = mori.toJs(mori.get(state, 'dances'));
        // let newDances = mori.toClj(Object.assign({}, dances, {'foo': emptyDance}));

        let dances = mori.get(state, 'dances');
        let newDances = mori.conj(dances, mori.hashMap('foo', mori.toClj(emptyDance)));

        // TODO: this could be more elegant
        let state1 = mori.assoc(state, 'dances', newDances);
        let state2 = mori.assoc(state1, 'currentDance', 'foo');
        return state2;

    } else if ('SET_DANCE_PROPERTY' === action.type) {
        let currentDance = mori.get(state, 'currentDance');
        let dance = mori.getIn(state, ['dances', currentDance]);
        // dance title as key for dances doesn't work when you change the title!  Duh.
        return dance.assocIn(['dances', currentDance, action.payload.prop], action.payload.value);

    } else {
        return state;
    }
}
