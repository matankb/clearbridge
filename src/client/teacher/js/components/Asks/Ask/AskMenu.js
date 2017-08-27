import React from 'react';
import PropTypes from 'prop-types';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import colors from '~/shared/js/constants/colors';

const style = {
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
};

const AskMenu = ({ handleDeleteTap }) => (
  <IconMenu
    iconButtonElement={ <IconButton ><MoreVertIcon color={ colors.gray } /></IconButton> }
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    style={ style.menu }
  >
    <MenuItem
      primaryText="Delete"
      leftIcon={ <DeleteIcon /> }
      onTouchTap={ handleDeleteTap }
    />
  </IconMenu>
);

AskMenu.propTypes = {
  handleDeleteTap: PropTypes.func.isRequired,
};

export default AskMenu;
