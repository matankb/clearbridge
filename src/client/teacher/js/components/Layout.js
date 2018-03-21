import React from 'react';

import { hot } from 'react-hot-loader';

import '~/teacher/css/layout.less';

import Header from './Header';
import Asks from './Asks';

class Layout extends React.Component {

  render() {
    return (
      <div className="layout">
        <Header />
        <Asks />
      </div>
    );
  }

}

export default hot(module)(Layout);
