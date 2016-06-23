import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';

import { toggleSidebarOpen } from '../../actions/layout';

const styles = {
  header: {
    fontSize: 10,
    backgroundColor: '#4285f4',
  },
  icon: {
    marginLeft: 10,
    width: 70,
    height: 70,
    paddingTop: 13,
    marginTop: -14,
  },
};

let Header = props => {
  return (
    <AppBar
      style={ styles.header }
      title="JCDS Bridge"
      onLeftIconButtonTouchTap={ props.handleIconClick }
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleIconClick: () => dispatch(toggleSidebarOpen()),
  };
}

Header = connect(
  () => { return {}; },
  mapDispatchToProps
)(Header);

export default Header;
