// NOTE: having app.js in a seperate file is neccesary for hot reloading
import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './routes.js';
import { theme } from '../../shared/js/constants';

const App = ({ store, history }) => {
  return (
    <Provider store={ store }>
      <MuiThemeProvider
        muiTheme={ theme }
      >
        <Routes history={ history } />
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
