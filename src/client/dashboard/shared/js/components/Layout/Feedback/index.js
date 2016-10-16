import React from 'react';
import { connect } from 'react-redux';

import FeedbackDialog from './Dialog';
import FeedbackButton from './FeedbackButton';
import StatusToast from './StatusToast';

import { sendFeedback } from '../../../reducers/feedback/sending';
import { resetFeedback } from '../../../reducers/feedback/reset';
import { setComment, setType } from '../../../reducers/feedback/data';

class Feedback extends React.Component {

  constructor() {
    super();
    this.state = { open: false };
  }

  open() {
    this.props.resetFeedbeck();
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  send() {
    this.props.send(this.props.data);
  }

  render() {
    return (
      <div className="feedback">
        <FeedbackButton handleTouchTap={ this.open.bind(this) } />
        <FeedbackDialog
          openState={ this.state.open }
          open={ this.open.bind(this) }
          close={ this.close.bind(this) }
          send={ () => { this.close(); this.props.send(); } }
          type={ this.props.data.type }
          comment={ this.props.data.comment }
          handleCommentChange={ this.props.handleCommentChange }
          handleTypeChange={ this.props.handleTypeChange }
        />
        <StatusToast
          status={ this.props.sendingStatus }
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    type: state.feedback.type,
    sendingStatus: state.feedback.sending.status,
    data: state.feedback.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    send: data => dispatch(sendFeedback(data)),
    resetFeedbeck: () => dispatch(resetFeedback()),
    handleCommentChange: e => dispatch(setComment(e.target.value)),
    handleTypeChange: (e, index, val) => dispatch(setType(val)),
  };
}

Feedback = connect(mapStateToProps, mapDispatchToProps)(Feedback);

export default Feedback;
