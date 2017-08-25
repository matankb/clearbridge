import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import BridgeIcon from '~/shared/assets/bridge.svg';
import colors from '~/shared/js/constants/colors';

const style = {
  appbar: {
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

const Header = () => (
  <AppBar
    title="JCDS Bridge"
    style={ style.appbar }
    iconElementLeft={ <IconButton style={ style.icon }><BridgeIcon /></IconButton> }
  />
);

export default Header;
