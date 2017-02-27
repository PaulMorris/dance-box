import { connect } from 'react-redux';
import * as components from './components';
import { addFigure } from './actions';
// addTodo, toggleTodo, 

export const App = connect(

  function mapStateToProps(state) {
      return { appState: state };
  },


// toggleTodo: id => dispatch(toggleTodo(id))
// addTodo: text => dispatch(addTodo(text)),
  function mapDispatchToProps(dispatch) {
      return {
        addFigure: id => dispatch(addFigure(id))
      };
  }
)(components.App);
