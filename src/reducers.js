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
          type: 'Circle',
          direction: ['Left', 'Right'],
          howFar: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0],
          duration: [4,8,12,16]
      },
      Star: {
          type: 'Star',
          direction: ['Left', 'Right'],
          hands: ['Wrist', 'Across'],
          howFar: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0],
          duration: [4,8,12,16]
      },
      Swing: {
          type: 'Swing',
          who: ['Partner', 'Neighbor'],
          duration: [4,8,12,16]
      },
      Balance: {
          type: 'Balance',
          who: ['Partner', 'Neighbor'],
          duration: [4]
      },
      Allemande: {
          type: 'Allemande',
          who: ['Partner', 'Neighbor', 'Gents', 'Ladies', 'Ones', 'Twos'],
          howFar: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0],
          duration: [4,8,12,16]
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
