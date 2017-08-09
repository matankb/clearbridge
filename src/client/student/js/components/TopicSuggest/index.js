import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopicSuggestCard from './TopicSuggestCard';

import { setType as setFeedbackType } from '../../../../shared/js/reducers/feedback/data';
import { openFeedback } from '../../../../shared/js/reducers/feedback/open';
import { resetFeedback } from '../../../../shared/js/reducers/feedback/reset';
import { TOPIC } from '../../../../shared/js/report';

const TopicSuggest = ({ handleCardClick }) => (
  <TopicSuggestCard onClick={ handleCardClick } />
);

TopicSuggest.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => ({
    handleCardClick: () => {
      dispatch(resetFeedback());
      dispatch(setFeedbackType(TOPIC));
      dispatch(openFeedback());
    },
  }),
)(TopicSuggest);
