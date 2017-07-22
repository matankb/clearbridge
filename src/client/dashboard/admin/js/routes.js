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
    >
      { props.children }
    </Layout>
  );
};

const Routes = ({ history }) => (
  <Router history={ history }>
    <Route path="/admin/" component={ LayoutWrapper } >
      <IndexRoute component={ Home } />
      <Route path="/admin/topics/" component={ Topics } />
      <Route path="/admin/users/" component={ Users } />
      <Route path="/admin/editor" component={ Editor } />
    </Route>
  </Router>
);

export default Routes;
