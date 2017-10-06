import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addAsk, deleteAsk } from '~/student/js/actions';

import AppPropTypes from '~/shared/js/constants/prop-types';
import withFetchAction from '~/shared/js/hocs/fetch-actions';
import { getTopicById } from '~/shared/js/utils';

import '~/student/css/ask.less';

import AskForm from './AskForm';
import AskList from './AskList';

class TopicPageAsk extends React.Component {

  sendAsk = question => {

    const data = {
      question,
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

  render() {
    return (
      <div className="ask">
        <AskForm name={ this.props.name} sendAsk={ this.sendAsk } />
        <AskList asks={ this.props.asks } />
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

  userID: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const topic = getTopicById(state.topics.topics, ownProps.id);
  return {
    name: topic.data.name,
    asks: topic.data.asks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAsk: (topicId, ask) => dispatch(addAsk(topicId, ask)),
  };
}

export default withFetchAction(connect(mapStateToProps, mapDispatchToProps)(TopicPageAsk));
