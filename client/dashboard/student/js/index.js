import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import rootReducer from './reducers';

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <AppContainer><App store={ store } /></AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    let NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer><NextApp store={ store } /></AppContainer>,
      document.getElementById('root')
    );
  });
}
window.store = store;

import './actions';
