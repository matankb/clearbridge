import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { sendFeedback } from '~/shared/js/reducers/feedback/sending';
import { setComment, setType } from '~/shared/js/reducers/feedback/data';
import { closeFeedback } from '~/shared/js/reducers/feedback/open';

import FeedbackDialog from './Dialog';
import StatusToast from './StatusToast';


const Feedback = ({
   open, data, sendingStatus,
   handleCommentChange, handleTypeChange,
   handleClose, send,
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

Feedback.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  sendingStatus: PropTypes.string.isRequired,

  handleCommentChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,

  send: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
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
