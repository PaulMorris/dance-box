import { List, Map, fromJS } from 'immutable';


// succinct hack for generating passable unique ids
// const uid = () => Math.random().toString(34).slice(2);

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

const initialState = fromJS({
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
    let prevEndBeat = figures.last() ? figures.last().get('endBeat') : 0;
    return {startBeat: prevEndBeat + 1, endBeat: prevEndBeat + duration};
};

var refreshStartsEnds = (figures) => {
    let prevFig = {startBeat: 0, endBeat: 0};
    for (let fig of figures) {
        let nextStartBeat = prevFig.endBeat + 1;
        fig.startBeat = nextStartBeat;
        fig.endBeat = prevFig.endBeat + fig.duration.value;
        prevFig = fig;
    }
    return figures;
};

export default function(state = initialState, action) {
    console.log('reducer action', action);
    // TODO: HARDCODED dance

    if ('ADD_FIGURE' === action.type) {
        // console.log("reducer add figure", action.payload);
        // console.log("state in reducer", state);
        let figureDefaults = action.payload,
            duration = figureDefaults.duration.value,
            figures = state.getIn(['dances', state.get('currentDance'), 'figures']),
            figureData = Object.assign({}, figureDefaults, getStartEnd(figures, duration));
        return state.updateIn(
            ['dances', state.get('currentDance'), 'figures'],
            list => list.push(Map(figureData))
        );

    } else if ('MODIFY_FIGURE' === action.type) {
        let {type, figureIndex, keyProp, value} = action.payload;
        let figures = state.getIn(['dances', state.get('currentDance'), 'figures']).toJS();
        // TODO: is this the best way to get the label?
        let propDefaults = state.getIn(['figureTypes', type, keyProp]).toJS();
        let label = propDefaults.find(item => item.value === value).label;
        figures[figureIndex][keyProp]['value'] = value;
        figures[figureIndex][keyProp]['label'] = label;

        let newFigures = fromJS('duration' === keyProp ? refreshStartsEnds(figures) : figures);

        return state.updateIn(
            ['dances', state.get('currentDance'), 'figures'],
            oldFigures => newFigures
        );

    } else if ('DELETE_FIGURE' === action.type) {
        let figureIndex = action.payload.figureIndex,
            figures = state.getIn(['dances', state.get('currentDance'), 'figures']),
            newFigures = fromJS(refreshStartsEnds(figures.delete(figureIndex).toJS()));
            // toUpdate = newFigures.slice(figureIndex);
        return state.updateIn(
            ['dances', state.get('currentDance'), 'figures'],
            oldFigures => newFigures
        );

    } else if ('ADD_NEW_DANCE' === action.type) {
        let dances = state.getIn(['dances']).toJS();

        let newDances = fromJS(Object.assign({}, dances, {'foo': emptyDance}));
        // TODO: this seems inelegant
        let state1 = state.updateIn(
            ['dances'],
            oldDances => newDances
        );
        let state2 = state1.set('currentDance', 'foo');
        return state2;

    } else if ('SET_DANCE_PROPERTY' === action.type) {
        let dance = state.getIn(['dances', state.get('currentDance')]);
        // dance title as key for dances doesn't work when you change the title!  Duh.
        return dance.setIn(['dances', state.get('currentDance'), action.payload.prop],
            action.payload.value);

    } else {
        return state;
    }
}
