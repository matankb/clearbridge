import React from 'react';
import { connect } from 'react-redux';

import { openFeedback } from '~/shared/js/reducers/feedback/open';

const FeedbackButton = ({ handleOpen, button }) => (
  <div onTouchTap={ handleOpen }>
    { button }
  </div>
);

export default connect(
  () => ({}),
  dispatch => ({ handleOpen: () => dispatch(openFeedback()) }),
)(FeedbackButton);
