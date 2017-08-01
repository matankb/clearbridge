import React from 'react';
import { connect } from 'react-redux';

import FeedbackDialog from './Dialog';
import StatusToast from './StatusToast';

import { sendFeedback } from '../../reducers/feedback/sending';
import { setComment, setType } from '../../reducers/feedback/data';
import { closeFeedback } from '../../reducers/feedback/open';

const Feedback = ({
   open, data, sendingStatus,
   handleCommentChange, handleTypeChange,
   handleOpen, handleClose, send,
}) => (
  <div className="feedback">
    <FeedbackDialog
      openState={ open }
      close={ handleClose }

      send={ () => {
        handleClose();
        send();
      } }

      type={ data.type }
      comment={ data.comment }

      handleCommentChange={ handleCommentChange }
      handleTypeChange={ handleTypeChange }
    />
    <StatusToast
      status={ sendingStatus }
    />
  </div>
);

function mapStateToProps(state) {
  return {
    type: state.feedback.type,
    sendingStatus: state.feedback.sending.status,
    data: state.feedback.data,
    open: state.feedback.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClose: () => dispatch(closeFeedback()),

    send: () => dispatch(sendFeedback()),

    handleCommentChange: e => dispatch(setComment(e.target.value)),
    handleTypeChange: (e, index, val) => dispatch(setType(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

export { default as FeedbackButton } from './FeedbackButton';