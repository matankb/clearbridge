import React from 'react';

import LoadableContent from '../../../../shared/js/components/LoadableContent';

import TopicPageHeader from './TopicPageHeader';
import TopicPageContent from './TopicPageContent';

import '../../../css/topic-page.less';
import colors from '../../constants/colors';
import emptyTopicImage from '../../../assets/empty-topic.png';

const defaultTopic = {
  data: {
    name: '',
    color: colors.notLoadedTopic,
    image: emptyTopicImage,
    blurb: '',
    content: '',
  },
  isFetching: false,
  error: null,
};

class TopicPage extends React.Component {

  componentDidMount() {
    this.loadTopic();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.topic.id !== this.props.topic.id) {
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

    return (
      <div className="page">
        <TopicPageHeader
          name={ data.name }
          blurb={ data.blurb }
          color={ data.color }
          image={ data.image }
        />
        <LoadableContent
          isLoading={ topic.isFetching }
          error={ topic.error }
          retry={ this.loadTopic }
        >
          <TopicPageContent content={ data.content } />
        </LoadableContent>
      </div>
    );
  }

}

export default TopicPage;
