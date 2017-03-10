import { connect } from 'react-redux';
import * as components from './components';
import {
    addFigure,
    modifyFigure,
    deleteFigure,
    addNewDance,
    setDanceProperty,
    setDanceMenuProperty,
    editDance,
    deleteDance,
    switchUiMode
} from './actions';

function mapStateToProps(state) {
    return { appState: state };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchAction: action => dispatch(dispatchAction(action)),
        addFigure: data => dispatch(addFigure(data)),
        modifyFigure: data => dispatch(modifyFigure(data)),
        deleteFigure: data => dispatch(deleteFigure(data)),
        addNewDance: data => dispatch(addNewDance()),
        setDanceProperty: (prop, value) => dispatch(setDanceProperty(prop, value)),
        setDanceMenuProperty: (prop, value) => dispatch(setDanceMenuProperty(prop, value)),
        editDance: id => dispatch(editDance(id)),
        deleteDance: id => dispatch(deleteDance(id)),
        switchUiMode: newMode => dispatch(switchUiMode(newMode))
    };
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(components.App);
