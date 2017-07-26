import React from 'react';

import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './routes';

const App = ({ store, theme }) => (
  <Provider store={ store }>
    <MuiThemeProvider
      muiTheme={ theme }
    >
      <Routes />
    </MuiThemeProvider>
  </Provider>
);

export default App;
