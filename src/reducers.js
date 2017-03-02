import { List, Map, fromJS } from 'immutable';

// dance title is the key
const demoDances = {
    'A Demo Dance': {
        authors: 'Paul Morris, Teri Harris',
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
    }
}

const oneToSixPlaces = [
    {value: 1, label: '1 Place'},
    {value: 2, label: '2 Places'},
    {value: 3, label: '3 Places'},
    {value: 4, label: '4 Places', default: true},
    {value: 5, label: '5 Places'},
    {value: 6, label: '6 Places'}
];

const initialState = fromJS({
  dances: demoDances,
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

    // TODO: HARDCODED dance

    if ('ADD_FIGURE' === action.type) {
        // console.log("reducer add figure", action.payload);
        // console.log("state in reducer", state);
        let figureDefaults = action.payload,
            duration = figureDefaults.duration.value,
            figures = state.getIn(['dances', 'A Demo Dance', 'figures']),
            figureData = Object.assign({}, figureDefaults, getStartEnd(figures, duration));
        return state.updateIn(
            ['dances', 'A Demo Dance', 'figures'],
            list => list.push(Map(figureData))
        );

    } else if ('MODIFY_FIGURE' === action.type) {
        let {type, figureIndex, keyProp, value} = action.payload;
        let figures = state.getIn(['dances', 'A Demo Dance', 'figures']).toJS();
        // TODO: is this the best way to get the label?
        let propDefaults = state.getIn(['figureTypes', type, keyProp]).toJS();
        let label = propDefaults.find(item => item.value === value).label;
        figures[figureIndex][keyProp]['value'] = value;
        figures[figureIndex][keyProp]['label'] = label;

        let newFigures = fromJS('duration' === keyProp ? refreshStartsEnds(figures) : figures);

        /*
        if ('duration' === keyProp) {
            let // figures = state.getIn(['dances', 'A Demo Dance', 'figures']),
                newFigures = fromJS(refreshStartsEnds(figures.toJS()));
        }
        */
        return state.updateIn(
            ['dances', 'A Demo Dance', 'figures'],
            oldFigures => newFigures
            /*
            fig => {
                console.log('MODIFY_FIGURE', fig.toJS());
                return fig.set(keyProp, value)
            });
            */
        );

    } else if ('DELETE_FIGURE' === action.type) {
        let figureIndex = action.payload.figureIndex,
            figures = state.getIn(['dances', 'A Demo Dance', 'figures']),
            newFigures = fromJS(refreshStartsEnds(figures.delete(figureIndex).toJS()));
            // toUpdate = newFigures.slice(figureIndex);
        return state.updateIn(
            ['dances', 'A Demo Dance', 'figures'],
            oldFigures => newFigures
        );
    } else {
        return state;
    }
      /*
    case 'ADD_TODO':
      // immutable .push, returns a new immutable List
      // and convert JS obj to immutable map
      return todos.push(Map(action.payload));

    case 'TOGGLE_TODO':
        return todos.map(t => {
          if(t.get('id') === action.payload) {

            // update is a method on immutable Maps
            // const todo = Map({ id: 0, text: 'foo', isDone: false });
            // todo.update('isDone', isDone => !isDone);
            // => { id: 0, text: 'foo', isDone: true }

            return t.update('isDone', isDone => !isDone);
          } else {
            return t;
          }
        });
        */
}
