import React from 'react';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import AboutIcon from 'material-ui/svg-icons/action/info';

import { openFeedback } from '~/shared/js/reducers/feedback/open';
import { resetFeedback } from '~/shared/js/reducers/feedback/reset';
import { openAbout } from '~/shared/js/reducers/about';


const HeaderMenu = ({ iconColor, handleFeedbackClick, handleAboutClick }) => {

  const iconElement = <IconButton><MoreVertIcon color={ iconColor } /></IconButton>;

  return (
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
      <MenuItem
        primaryText="About"
        leftIcon={ <AboutIcon /> }
        onTouchTap={ handleAboutClick }
      />
    </IconMenu>
  );
};

export default connect(
  () => ({}),
  dispatch => ({
    handleFeedbackClick: () => {
      dispatch(resetFeedback());
      dispatch(openFeedback());
    },
    handleAboutClick: () => dispatch(openAbout()),
  }),
)(HeaderMenu);
