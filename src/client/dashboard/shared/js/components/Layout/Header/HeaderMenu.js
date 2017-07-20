import React from 'react';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';

import { openFeedback } from '../../../../../shared/js/reducers/feedback/open';

const iconElement = <IconButton><MoreVertIcon color="white" /></IconButton>;

const HeaderMenu = ({ handleFeedbackClick }) => (
  <IconMenu
    iconButtonElement={ iconElement }
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
  <MenuItem
    primaryText="Logout"
    leftIcon={ <LogoutIcon /> }
    onTouchTap={ () => { location.href = '/logout'; } }
  />
  <MenuItem
    primaryText="Feedback"
    leftIcon={ <FeedbackIcon /> }
    onTouchTap={ handleFeedbackClick }
  />
  </IconMenu>
);

export default connect(
  () => ({}),
  dispatch => ({
    handleFeedbackClick: () => dispatch(openFeedback()),
  })
)(HeaderMenu);
