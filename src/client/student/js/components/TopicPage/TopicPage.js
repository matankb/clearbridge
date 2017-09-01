import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadableContent from '~/shared/js/components/LoadableContent';
import requiresTopicList from '~/student/js/hocs/requires-topic-list';

import { requestTopic } from '~/student/js/actions';

import AppPropTypes from '~/shared/js/constants/prop-types';
import colors from '~/student/js/constants/colors';

import { getTopicById } from '~/shared/js/utils';

import '~/student/css/topic-page.less';

import TopicPageHeader from './TopicPageHeader';
import TopicPageMain from './TopicPageMain';


const defaultTopic = {
  data: {
    name: '',
    color: colors.notLoadedTopic,
    image: '',
    blurb: '',
    content: '',
    asks: [],
  },
};

const notFoundError = { status: 404, offline: false };

function getId(topic) {
  return topic ? topic.id : null;
}

class TopicPage extends React.Component {

  static propTypes = {
    topic: AppPropTypes.topic,
    topicListLoaded: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
  }

  static defaultProps = {
    topic: null,
  }

  componentDidMount() {
    this.loadTopic();
  }
  componentDidUpdate(prevProps) {
    if (getId(prevProps.topic) !== getId(this.props.topic)) {
      this.loadTopic();
    }
  }

  loadTopic = () => {
    if (this.props.topic) {
      this.props.load(this.props.topic.id);
    }
  }

  render() {

    const topic = this.props.topic || defaultTopic;
    const { data } = topic;
    const error = !this.props.topic && this.props.topicListLoaded ? notFoundError : topic.error;
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
          error={ error }
          retry={ this.loadTopic }
        >
          <TopicPageMain id={ topic.id } content={ data.content } color={ data.color } />
        </LoadableContent>
      </div>
    );
  }

}

function mapStateToProps(state, { match: { params } }) {
  let topic = getTopicById(state.topics.topics, params.id);
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
