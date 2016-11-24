// polyfills!
import 'babel-polyfill';

// react core
import React from 'react';
import ReactDOM from 'react-dom';

// redux + middleware
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// my stuff
import theme from '../../shared/js/constants/theme';
import Routes from './routes.js';
import rootReducer from './reducers';
import rootSaga from './sagas';

// setup store with middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

/* RENDER */

injectTapEventPlugin(); // neccesary for material-ui

ReactDOM.render(

  <Provider store={ store }>
    <MuiThemeProvider
      muiTheme={ theme }
    >
      <Routes />
    </MuiThemeProvider>
  </Provider>,

  document.getElementById('root')

);
