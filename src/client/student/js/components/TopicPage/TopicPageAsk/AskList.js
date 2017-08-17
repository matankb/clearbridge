import React from 'react';
import PropTypes from 'prop-types';

const AskList = ({ asks }) => (
  <div className="ask-list">
    {
      asks.map(ask => (
        <div className="ask-item" key={ ask._id }>
          <h3 className="question">{ ask.question }</h3>
          <div className="answer">{ ask.answer }</div>
        </div>
      ))
    }
  </div>
);

AskList.propTypes = {
  asks: PropTypes.array.isRequired,
};

export default AskList;
