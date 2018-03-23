import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Feedback from '~/shared/js/components/Feedback';
import About from '~/shared/js/components/About';

import ErrorNotification from '~/shared/js/components/ErrorNotification';

import ErrorBoundry from '~/shared/js/components/ErrorBoundry';
import '~/student/css/layout.less';

import Header from './Header';
import Home from './Home';
import User from './User';


const Layout = () => (
  <div className="layout">

    <ErrorBoundry>
      <Header />
    </ErrorBoundry>

    <ErrorBoundry>
      <Feedback />
    </ErrorBoundry>

    <About />

    <ErrorNotification />

    <User />

    <Switch>
      <Route path="/student/" component={ Home } />
    </Switch>

  </div>
);


export default Layout;
