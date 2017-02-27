import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { App } from './containers';

import { List, Map } from 'immutable';

const store = createStore(reducer);

render(
  // make the containers aware of the store, using the <Provider /> component
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
