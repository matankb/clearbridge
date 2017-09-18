// polyfills!
import 'babel-polyfill';

// react core
import React from 'react';
import ReactDOM from 'react-dom';

// redux + middleware
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// my stuff
import rootSaga from './sagas/';
import theme from '../../shared/js/constants/theme';
import Routes from './routes';
import rootReducer from './reducers';


// setup store with middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

/* RENDER */

injectTapEventPlugin(); // neccesary for material-ui

ReactDOM.render(

  <Provider store={ store }>
    <MuiThemeProvider
      muiTheme={ theme }
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,

  document.getElementById('root'),

);
