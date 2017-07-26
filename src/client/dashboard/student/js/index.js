// polyfills!
import 'babel-polyfill';
import 'whatwg-fetch';

// react core
import React from 'react';
import ReactDOM from 'react-dom';

// redux + middleware
import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// material-ui
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// hot loading
import { AppContainer } from 'react-hot-loader';

// my stuff
import App from './App';
import theme from '../../shared/js/constants/theme';
// import Routes from './routes';
import rootReducer from './reducers';
import rootSaga from './sagas';

// setup store with middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

/* RENDER */

injectTapEventPlugin(); // neccesary for material-ui

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component
        store={ store }
        theme={ theme }
      />
    </AppContainer>,
    document.getElementById('root'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept(() => { render(App); });
}
