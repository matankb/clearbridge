import React from 'react';
import { connect } from 'react-redux';
import { requestTopicList } from '../../actions';

import GridLayout from './GridLayout';
import TopicCard from '../TopicCard';
import TopicSuggest from '../TopicSuggest';
import LoadableContent from '../../../../shared/js/components/LoadableContent';

class TopicList extends React.Component {

  componentDidMount() {
    this.props.fetchTopics(); // load topic list into redux store
  }

  render() {

    const topicCards = this.props.topics.map(topic => (
      <TopicCard
        name={ topic.data.name }
        image={ topic.data.image }
        color={ topic.data.color }
        id={ topic.id }
      />
    ));

    topicCards.push(<TopicSuggest />);

    return (
      <div className="topic-list">
        <LoadableContent isLoading={ this.props.isFetching }>
          <GridLayout items={ topicCards } />
        </LoadableContent>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicList);
