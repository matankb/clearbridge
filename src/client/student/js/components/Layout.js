import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Feedback from '~/shared/js/components/Feedback';
import About from '~/shared/js/components/About';

import ErrorNotification from '~/shared/js/components/ErrorNotification';

import '~/student/css/layout.less';

import Header from './Header';
import Home from './Home';


const Layout = () => (
  <div className="layout">

    <Header />

    <Feedback />
    <About />

    <ErrorNotification />

    <Switch>
      <Route path="/student/" component={ Home } />
    </Switch>

  </div>
);


export default Layout;
