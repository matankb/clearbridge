import React from 'react';
import AppBar from 'material-ui/AppBar';

import { colors } from '../../constants';

const styles = {
  header: {
    fontSize: 10,
    backgroundColor: colors.primary.dark,
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

export default Header;
