import React from 'react';
import { connect } from 'react-redux';
import { fetchTopicList } from '../../actions';

import GridLayout from './GridLayout';
import TopicCard from '../TopicCard';

class TopicList extends React.Component {

  componentWillMount() {
    this.props.fetchTopics(); // load topic list into redux store
  }

  render() {

    const topicCards = this.props.topics.map(topic => {
      return (
        <TopicCard
          name={ topic.name }
          image={ topic.image }
          color={ topic.color }
          _id={ topic._id }
        />
      );
    });
    return (
      <div className="topic-list">
        <GridLayout items={ topicCards } />
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topics.isFetchingTopicList,
    topics: state.topics.topics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopics: () => {
      dispatch(fetchTopicList());
    },
  };
}

TopicList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicList);

export default TopicList;
