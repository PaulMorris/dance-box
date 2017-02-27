

export function addFigure(data) {
    console.log("ADD_FIGURE");
    return {
        type: 'ADD_FIGURE',
        payload: data
    };
}

// succinct hack for generating passable unique ids
// const uid = () => Math.random().toString(34).slice(2);

/*
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: uid(),
      isDone: false,
      text: text
    }
  };
}
*/

/*
export function loadfigureButtons(id) {
    return {
        type: 'LOAD_FIGURE_BUTTONS',
        payload: [
          Map({id: 'circle'}),
          Map({id: 'balance'}),
          Map({id: 'swing'}),
          Map({id: 'allemande'})
        ]
    }
}
*/
/*
export function toggleTodo(id) {
  return {
        type: 'TOGGLE_TODO',
        payload: id
    };
}
*/
