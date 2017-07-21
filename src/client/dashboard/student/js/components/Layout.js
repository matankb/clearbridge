import React from 'react';

import Header from './Header';
import Feedback from '../../../shared/js/components/Feedback';
import About from '../../../shared/js/components/About';

import '../../css/layout.less';

const Layout = props => {
  return (
    <div className="layout">
      <Header />
      <Feedback />
      <About />
      { props.children }
    </div>
  );
};

export default Layout;
