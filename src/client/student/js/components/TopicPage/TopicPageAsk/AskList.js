import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import colors from '~/shared/js/constants/colors';

const AskItem = ({ question, answer, showControls, handleDelete }) => (
  <div className="ask-item">
    <h3 className="question">{ question }</h3>
    {
      showControls &&
        <div className="controls">
          <IconButton onTouchTap={ handleDelete }>
            <DeleteIcon color={ colors.gray } />
          </IconButton>
        </div>
    }
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

  showControls: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

AskItem.defaultProps = {
  answer: null, // null answer means question is unanswered
};

const AskList = ({ asks, userID, deleteAsk }) => {

  const askElements = asks.map(ask => (
    <AskItem
      key={ ask.id }
      id={ ask.id }
      question={ ask.question }
      answer={ ask.answer }
      showControls={ ask.asker === userID }
      handleDelete={ () => deleteAsk(ask.id) }
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
  userID: PropTypes.string.isRequired,

  deleteAsk: PropTypes.func.isRequired,
};

export default AskList;
