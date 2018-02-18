import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addAsk, deleteAsk, editAsk } from '~/student/js/actions';

import AppPropTypes from '~/shared/js/constants/prop-types';
import withFetchAction from '~/shared/js/hocs/fetch-actions';
import { getTopicById } from '~/shared/js/utils';

import '~/student/css/ask.less';

import AskForm from './AskForm';
import AskList from './AskList';

class TopicPageAsk extends React.Component {

  sendAsk = (question, isPrivate) => {

    const data = {
      question,
      private: isPrivate, // private is reserved word in strict mode, can't be used for arg names
      topic: this.props.id,
    };

    const messages = {
      fetchingMessage: 'Sending question...',
      fetchedMessage: 'Question sent!',
      errorMessage: 'Error sending question. Please try again.',
    };

    this.props.fetchAction('/api/asks/', {
      method: 'POST',
      body: JSON.stringify({ data }),
    }, messages)
      .then(ask => this.props.addAsk(this.props.id, ask));

  }

  deleteAsk = askID => {

    const messages = {
      fetchingMessage: 'Deleting question...',
      fetchedMessage: 'Question deleted!',
      errorMessage: 'Error deleting question. Please try again.',
    };

    this.props.fetchAction(`/api/asks/${askID}`, {
      method: 'DELETE',
    }, messages)
      .then(() => this.props.deleteAsk(this.props.id, askID)); // remove ask from store

  }

  editAsk = (askID, newAsk) => {
    const messages = {
      fetchingMessage: 'Editing question...',
      fetchedMessage: 'Question edited!',
      errorMessage: 'Error editing question. Please try again.',
    };

    this.props.fetchAction(`/api/asks/${askID}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data: newAsk,
      }),
    }, messages)
      .then(() => this.props.editAsk(this.props.id, askID, newAsk));

  }

  render() {
    return (
      <div className="ask">
        <AskForm name={ this.props.name} sendAsk={ this.sendAsk } />
        <AskList
          asks={ this.props.asks }
          userID={ this.props.userID }
          deleteAsk={ this.deleteAsk }
          editAsk={ this.editAsk }
        />
      </div>
    );
  }
}

TopicPageAsk.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  asks: PropTypes.arrayOf(AppPropTypes.ask).isRequired,

  fetchAction: PropTypes.func.isRequired,
  addAsk: PropTypes.func.isRequired,
  deleteAsk: PropTypes.func.isRequired,
  editAsk: PropTypes.func.isRequired,

  userID: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const topic = getTopicById(state.topics.topics, ownProps.id);
  return {
    name: topic.data.name,
    userID: state.user.user.id,
    asks: topic.data.asks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAsk: (topicId, ask) => dispatch(addAsk(topicId, ask)),
    deleteAsk: (topicID, askID) => dispatch(deleteAsk(topicID, askID)),
    // AskList is responsible for compiling newAsk
    editAsk: (topicID, askID, newAsk) => dispatch(editAsk(topicID, askID, newAsk)),
  };
}

export default withFetchAction(connect(mapStateToProps, mapDispatchToProps)(TopicPageAsk));
