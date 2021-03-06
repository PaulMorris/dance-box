import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { App } from './containers';
import { fromJS } from 'immutable';

// CREATE STORE / HANDLE LOCAL STORAGE

// TODO: better to not do immutable to/fromJS when saving/restoring state
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return fromJS(JSON.parse(serializedState));
    } catch (err) {
        return undefined;
    }
};

const store = createStore(reducer, loadState());

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};

const unsubscribe = store.subscribe(() => {
    saveState(store.getState().toJS());
});

// RENDER

render(
  // make the containers aware of the store, using the <Provider /> component
  React.createElement(
      Provider,
      {store: store},
      React.createElement(App)
  ),
  document.getElementById('app')
);
