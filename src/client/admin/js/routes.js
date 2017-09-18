import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../../shared/js/components/Layout';
import Users from './components/Users';
import Asks from './components/Asks';
import Topics from './components/Topics';
import Home from './components/Home';

import { sidebarItems } from './constants';

const Routes = () => (
  <Layout sidebarItems={ sidebarItems } >
    <Switch>
      <Route path="/admin/" exact component={ Home } />
      <Route path="/admin/topics/" component={ Topics } />
      <Route path="/admin/asks" component={ Asks } />
      <Route path="/admin/users/" component={ Users } />
    </Switch>
  </Layout>
);

export default Routes;
