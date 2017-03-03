import { connect } from 'react-redux';
import * as components from './components';
import { addFigure, modifyFigure, deleteFigure, addNewDance, setDanceProperty } from './actions';
// addTodo, toggleTodo,

export const App = connect(

  function mapStateToProps(state) {
      return { appState: state };
  },


// toggleTodo: id => dispatch(toggleTodo(id))
// addTodo: text => dispatch(addTodo(text)),
  function mapDispatchToProps(dispatch) {
      return {
        addFigure: data => dispatch(addFigure(data)),
        modifyFigure: data => dispatch(modifyFigure(data)),
        deleteFigure: data => dispatch(deleteFigure(data)),
        addNewDance: data => dispatch(addNewDance()),
        setDanceProperty: (prop, value) => dispatch(setDanceProperty(prop, value))
      };
  }
)(components.App);
