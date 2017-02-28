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



const initialState = fromJS({
  dances: demoDances,
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

export default function(state = initialState, action) {
  switch(action.type) {

    case 'ADD_FIGURE':
        // console.log("reducer add figure", action.payload);
        // console.log("state in reducer", state);
        // TODO: HARDCODED
        return state.updateIn(
            ['dances', 'A Demo Dance', 'figures'],
            list => list.push(Map(action.payload))
        );

    case 'MODIFY_FIGURE':
        return state.updateIn(
            ['dances', 'A Demo Dance', 'figures', action.payload.figureIndex],
            fig => {
                console.log('MODIFY_FIGURE', fig.toJS());
                return fig.set(action.payload.keyProp, action.payload.value)
            });

    case 'DELETE_FIGURE':
        return state.updateIn(
            ['dances', 'A Demo Dance', 'figures'],
            figures => figures.delete(action.payload.figureIndex)
        );

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

    default:
      return state;
  }
}
