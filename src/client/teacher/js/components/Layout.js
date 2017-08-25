import React from 'react';

import '~/teacher/css/layout.less';

import Header from './Header';

class Layout extends React.Component {

  render() {
    return (
      <div className="layout">
        <Header />
      </div>
    );
  }

}

export default Layout;
