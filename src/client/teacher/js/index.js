// react core
import React from 'react';
import ReactDOM from 'react-dom';

// react-router
import { BrowserRouter } from 'react-router-dom';

// redux + middleware
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// hot loading
import { AppContainer } from 'react-hot-loader';

// my stuff
import theme from '~/shared/js/constants/theme';
import '~/shared/js/app-banner';

import Layout from './components/Layout';
import rootReducer from './reducers';
import rootSaga from './sagas';


// setup store with middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

// sagaMiddleware.run(rootSaga);

/* RENDER */

injectTapEventPlugin(); // neccesary for material-ui

function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <MuiThemeProvider
          muiTheme={ theme }
        >
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
}

render();

if (module.hot) {
  module.hot.accept('./components/Layout', render);
}
