import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Layout from '../../shared/js/components/Layout';
import Users from './components/Users';
import Topics from './components/Topics';
import Home from './components/Home';
import Editor from './components/Editor';

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
        <Route path="/dashboard/topics/" component={ Topics } />
        <Route path="/dashboard/users/" component={ Users } />
        <Route path="/dashboard/editor" component={ Editor } />
      </Route>
    </Router>
  );
};

export default Routes;
