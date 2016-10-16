import React from 'react';

import IconButton from 'material-ui/IconButton';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';

const FeedbackButton = ({ handleTouchTap }) => (
  <IconButton
    title="Feedback"
    onTouchTap={ handleTouchTap }
  >
    <FeedbackIcon
      color="white"
    />
  </IconButton>
);

export default FeedbackButton;
