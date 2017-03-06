import { connect } from 'react-redux';
import * as components from './components';
import {
    addFigure,
    modifyFigure,
    deleteFigure,
    addNewDance,
    setDanceProperty,
    editDance
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
        editDance: id => dispatch(editDance(id))
    };
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(components.App);
