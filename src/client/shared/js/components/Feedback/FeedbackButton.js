import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { openFeedback } from '~/shared/js/reducers/feedback/open';

const FeedbackButton = ({ handleOpen, button }) => (
  <div onTouchTap={ handleOpen }>
    { button }
  </div>
);

FeedbackButton.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  button: PropTypes.element.isRequired,
};

export default connect(
  () => ({}),
  dispatch => ({ handleOpen: () => dispatch(openFeedback()) }),
)(FeedbackButton);
