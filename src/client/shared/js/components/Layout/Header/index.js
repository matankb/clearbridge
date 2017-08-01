import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';

import { FeedbackButton } from '../../Feedback';
import HeaderMenu from './HeaderMenu';

import { colors } from '../../../constants';

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

  const feedbackButton = (
    <FeedbackButton button={
        <IconButton title="Feedback">
          <FeedbackIcon color="white" />
        </IconButton>
      }
    />
  );

  return (
    <AppBar
      style={ styles.header }
      title="JCDS Bridge"
      onLeftIconButtonTouchTap={ props.handleIconClick }
      iconElementRight={ feedbackButton }
    />
  );
};

export default Header;
export { HeaderMenu };
