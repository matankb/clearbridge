import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestTopicList } from '~/student/js/actions';

import AppPropTypes from '~/shared/js/constants/prop-types';

import TopicCard from '~/student/js/components/TopicCard';
import TopicSuggest from '~/student/js/components/TopicSuggest';
import LoadableContent from '~/shared/js/components/LoadableContent';

import '~/student/css/topic-list.less';

import GridLayout from './GridLayout';

class TopicList extends React.Component {

  static propTypes = {
    topics: PropTypes.arrayOf(AppPropTypes.topic).isRequired,
    fetchTopics: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: AppPropTypes.error,
  }

  static defaultProps = {
    error: null,
  }

  componentDidMount() {
    this.props.fetchTopics(); // load topic list into redux store
  }

  render() {

    const topicCards = this.props.topics.map(topic => (
      <TopicCard
        id={ topic.id }
        name={ topic.data.name }
        image={ topic.data.image }
        color={ topic.data.color }
      />
    ));

    topicCards.push(<TopicSuggest />);

    return (
      <div className="topic-list">
        <LoadableContent
          isLoading={ this.props.isFetching }
          error={ this.props.error }
          retry={ this.props.fetchTopics }
        >
          <GridLayout items={ topicCards } />
        </LoadableContent>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topics.isFetchingTopicList,
    error: state.topics.topicListError,
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
