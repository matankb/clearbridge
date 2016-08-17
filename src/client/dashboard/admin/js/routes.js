import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Layout from '../../shared/js/components/Layout';
import Users from './components/Users';
import Topics from './components/Topics';
import Home from './App1/Home';

import { sidebarItems } from './constants';

const LayoutWrapper = props => {
  return (
    <Layout
      sidebarItems={ sidebarItems }
      location={ props.location }
      children={ props.children }
    />
 );
};

const Routes = ({ history }) => {
  return (
    <Router history={ history }>
      <Route path="/dashboard/" component={ LayoutWrapper } >
        <IndexRoute component={ Home } />
        <Route path="/dashboard/classes/" component={ Users } />
        <Route path="/dashboard/users/" component={ Users } />
        <Route path="/dashboard/topics/" component={ Topics } />
        <Route path="/dashboard/settings/" component={ Users } />
        <Route path="/dashboard/about/" component={ Users } />
        <Route path="/dashboard/help/" component={ Users } />
      </Route>
    </Router>
  );
};

export default Routes;
