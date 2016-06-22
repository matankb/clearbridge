// NOTE: having app.js in a seperate file is neccesary for hot reloading
import React from 'react';
import { Provider } from 'react-redux';

import Routes from './routes.js';

const App = ({ store }) => <Provider store={ store }><Routes /></Provider>;

export default App;
