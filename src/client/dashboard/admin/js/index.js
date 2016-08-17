import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import rootReducer from './reducers';

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <App store={ store } history={ history } />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    let NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp store={ store } />,
      document.getElementById('root')
    );
  });
}

window.store = store;
