import React from 'react';

import { connect } from 'react-redux';
import { selectTopic, toggleTopicPage, fetchTopic } from '../actions';

import '../../css/topic-card.less';

class TopicCard extends React.Component {
  handleClick() {
    if (this.props.shouldFetchTopic) {
      this.props.fetchTopic(this.props.id);
    }
    this.props.openTopicPage();
  }
  render() {
    return (
      <div
        className="topic"
        style={{ backgroundColor: this.props.color }}
        onClick={ this.handleClick.bind(this) }
      >
        <img src={ this.props.image } alt="" className="image" />
        <div className="name">{ this.props.name }</div>
      </div>
    );
  }
}

function getTopicById(_id, topics) {
  return topics.filter(topic => topic._id === _id)[0] || '';
}

function shouldFetchTopic(_id, topics) {
  let topic = getTopicById(_id, topics);
  return !topic.hasFull || !topic.isFetching;
}

function mapStateToProps(state, ownProps) {
  return {
    shouldFetchTopic: shouldFetchTopic(ownProps._id, state.topics.topics),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    openTopicPage: () => {
      dispatch(selectTopic(ownProps._id));
      dispatch(toggleTopicPage());
    },
    fetchTopic: () => {
      dispatch(fetchTopic(ownProps._id));
    },
  };
}

TopicCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicCard);

export default TopicCard;
