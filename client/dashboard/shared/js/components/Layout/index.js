import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Sidebar from './Sidebar';

import '../../../css/layout.css';

const styles = {
  main(props) {
    let style = {
      width: '85%',
      paddingTop: 8,
    };
    if (props.open) {
      style.float = 'right';
    } else {
      style.marginRight = 'auto';
      style.marginLeft = 'auto';
    }
    return style;
  },
};

let Layout = props => {
  return (
    <div className="layout">
      <Header />
      <Sidebar items={ props.sidebarItems } open={ props.open } location={ props.location } />
      <main style={ styles.main(props) }>
        { props.children }
      </main>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    open: state.layout.sidebar.open,
  };
}

Layout = connect(
  mapStateToProps
)(Layout);

export default Layout;
