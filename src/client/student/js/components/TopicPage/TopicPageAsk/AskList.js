import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransitionGroup } from 'react-transition-group';

const AskItem = ({ question, answer }) => (
  <div className="ask-item">
    <h3 className="question">{ question }</h3>
    {
      answer ?
        <div className="answer">{ answer }</div> :
        <div className="no-answer">No answer yet</div>
    }
  </div>
);

AskItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,
};

AskItem.defaultProps = {
  answer: null, // null answer means question is unanswered
};

const AskList = ({ asks }) => {

  const askElements = asks.map(ask => (
    <AskItem
      key={ ask._id }
      id={ ask._id }
      question={ ask.question }
      answer={ ask.answer }
    />
  ));

  return (
    <div className="ask-list">

      <CSSTransitionGroup
        transitionName="ask-item"
        transitionEnterTimeout={ 200 }
        transitionLeaveTimeout={ 200 }
        component="div"
      >
        { askElements }
      </CSSTransitionGroup>

    </div>
  );
};

AskList.propTypes = {
  asks: PropTypes.array.isRequired,
};

export default AskList;
