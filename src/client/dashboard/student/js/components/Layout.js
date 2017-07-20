import React from 'react';

import Header from './Header';
import Feedback from '../../../shared/js/components/Feedback';

import '../../css/layout.less';

const Layout = props => {
  return (
    <div className="layout">
      <Header />
      <Feedback />
      { props.children }
    </div>
  );
};

export default Layout;
