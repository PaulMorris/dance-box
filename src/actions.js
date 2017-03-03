

export function addFigure(data) {
    console.log("ADD_FIGURE", data);
    return {
        type: 'ADD_FIGURE',
        payload: data
    };
}

export function modifyFigure(data) {
    console.log("modifyFigure", data);
    return {
        type: 'MODIFY_FIGURE',
        payload: data
    };
}

export function deleteFigure(data) {
    return {
        type: 'DELETE_FIGURE',
        payload: data
    };
}

export function addNewDance() {
    return {
        type: 'ADD_NEW_DANCE'
    };
}

export function setDanceProperty(prop, value) {
    return {
        type: 'SET_DANCE_PROPERTY',
        payload: {prop: prop, value: value}
    }
}
