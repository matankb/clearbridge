import React from 'react';
import { connect } from 'react-redux';

import TopicSuggestCard from './TopicSuggestCard';

import { setType as setFeedbackType } from '../../../../shared/js/reducers/feedback/data';
import { openFeedback } from '../../../../shared/js/reducers/feedback/open';
import { resetFeedback } from '../../../../shared/js/reducers/feedback/reset';
import { TOPIC } from '../../../../shared/js/report';

class TopicSuggest extends React.Component {
  render() {
    return (
      <span>
        <TopicSuggestCard onClick={ this.props.handleCardClick } />
      </span>
    );
  }

}

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
