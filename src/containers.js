import { connect } from 'react-redux';
import * as components from './components';

const mapStateToProps = (state) => ({ state: state });

/*
 2nd arg is a mapDispatchToProps function, but when omitted 'the default
 implementation just injects dispatch into your component’s props' -- perfect.
*/
export const App = connect(mapStateToProps)(components.App);
