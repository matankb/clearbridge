// NOTE: having app.js in a seperate file is neccesary for hot reloading
import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './routes.js';

const App = ({ store }) => (
  <Provider store={ store }><MuiThemeProvider><Routes /></MuiThemeProvider></Provider>
);

export default App;
