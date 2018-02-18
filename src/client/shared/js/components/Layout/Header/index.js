import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';

import { colors } from '~/shared/js/constants';
import { FeedbackButton } from '~/shared/js/components/Feedback';

import HeaderMenu from './HeaderMenu';


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

const Header = props => {

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
      title="ClearBridge"
      onLeftIconButtonClick={ props.handleIconClick }
      iconElementRight={ feedbackButton }
    />
  );
};

Header.propTypes = {
  handleIconClick: PropTypes.func.isRequired,
};

export default Header;
export { HeaderMenu };
