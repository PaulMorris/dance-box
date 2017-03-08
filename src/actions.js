
// ui state

export const switchUiMode = (newMode) => ({
    type: 'SWITCH_UI_MODE',
    payload: newMode
});

// figures

export const addFigure = (data) => ({
    type: 'ADD_FIGURE',
    payload: data
});

export const modifyFigure = (data) => ({
    type: 'MODIFY_FIGURE',
    payload: data
});

export const deleteFigure = (data) => ({
    type: 'DELETE_FIGURE',
    payload: data
});

// dances

export const addNewDance = () => ({
    type: 'ADD_NEW_DANCE'
});

export const editDance = (id) => ({
    type: 'EDIT_DANCE',
    payload: id
});

export const setDanceProperty = (prop, value) => ({
    type: 'SET_DANCE_PROPERTY',
    payload: {prop: prop, value: value}
});

export const setDanceMenuProperty = (prop, value) => ({
    type: 'SET_DANCE_MENU_PROPERTY',
    payload: {prop: prop, value: value}
});
