import React from 'react';
import { connect } from 'react-redux';

import LoadableContent from '../../../../shared/js/components/LoadableContent';

import TopicPageHeader from './TopicPageHeader';
import TopicPageContent from './TopicPageContent';

import requiresTopicList from '../../hocs/requires-topic-list';

import { requestTopic } from '../../actions';

import colors from '../../constants/colors';

import '../../../css/topic-page.less';

const defaultTopic = {
  data: {
    name: '',
    color: colors.notLoadedTopic,
    image: '',
    blurb: '',
    content: '',
  },
};

class TopicPage extends React.Component {

  componentDidMount() {
    this.loadTopic();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.topic && this.props.topic) {
      this.loadTopic();
    }
  }

  loadTopic = () => {
    if (this.props.topicListLoaded) {
      this.props.load(this.props.topic.id);
    }
  }

  render() {

    const topic = this.props.topic || defaultTopic;
    const { data } = topic;
    const notFoundError =
      !this.props.topic && this.props.topicListLoaded ?
      { status: 404, offline: false } :
      null;

    return (
      <div className="topic-page">
        <TopicPageHeader
          name={ data.name }
          blurb={ data.blurb }
          color={ data.color }
          image={ data.image }
        />
        <LoadableContent
          isLoading={ !this.props.topicListLoaded || topic.isFetching }
          error={ topic.error || notFoundError }
          retry={ this.loadTopic }
        >
          <TopicPageContent content={ data.content } />
        </LoadableContent>
      </div>
    );
  }

}

function getTopicById(id, topics) {
  return topics.find(topic => topic.id === id);
}

function mapStateToProps(state, { match: { params } }) {
  let topic = getTopicById(params.id, state.topics.topics);
  return {
    topic,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    load: id => dispatch(requestTopic(id)),
  };
}

export default requiresTopicList(connect(
  mapStateToProps,
  matchDispatchToProps,
)(TopicPage));
