import React from 'react';
import { connect } from 'react-redux';
import { requestTopicList } from '../../actions';

import GridLayout from './GridLayout';
import TopicCard from '../TopicCard';
import TopicSuggest from '../TopicSuggest';

class TopicList extends React.Component {

  componentDidMount() {
    this.props.fetchTopics(); // load topic list into redux store
  }

  render() {

    const topicCards = this.props.topics.map(topic => {
      return (
        <TopicCard
          name={ topic.data.name }
          image={ topic.data.image }
          color={ topic.data.color }
          id={ topic.id }
        />
      );
    });

    topicCards.push(<TopicSuggest />);

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
      dispatch(requestTopicList());
    },
  };
}

TopicList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicList);

export default TopicList;
