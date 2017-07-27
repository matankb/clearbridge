import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './components/Layout';

const App = ({ store, theme }) => (
  <Provider store={ store }>
    <MuiThemeProvider
      muiTheme={ theme }
    >
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default App;
