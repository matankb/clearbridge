import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';

const Routes = () => {
  return (
    <Router history={ browserHistory }>
      <Route path="/dashboard/" component={ Layout } >
        <IndexRoute component={ Home } />
      </Route>
    </Router>
  );
};

export default Routes;
