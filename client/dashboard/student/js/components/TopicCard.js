import React from 'react';

import { connect } from 'react-redux';
import { selectTopic, toggleTopicPage, fetchTopic } from '../actions';

import '../../css/topic-card.scss';

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

function getTopicById(id, topics) {
  return topics.filter(topic => topic.id === id)[0] || '';
}

function shouldFetchTopic(id, topics) {
  let topic = getTopicById(id, topics);
  return !topic.hasFull || !topic.isFetching;
}

function mapStateToProps(state, ownProps) {
  return {
    name: ownProps.name,
    image: ownProps.image,
    color: ownProps.color,
    id: ownProps.id,
    shouldFetchTopic: shouldFetchTopic(ownProps.id, state.topics),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    openTopicPage: () => {
      dispatch(selectTopic(ownProps.id));
      dispatch(toggleTopicPage());
    },
    fetchTopic: () => {
      dispatch(fetchTopic(ownProps.id));
    },
  };
}

TopicCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicCard);

export default TopicCard;
