import React from 'react';

import LoadableContent from '../../../../shared/js/components/LoadableContent';

import TopicPageHeader from './TopicPageHeader';
import TopicPageNav from './TopicPageNav';
import TopicPageContent from './TopicPageContent';

import '../../../css/topic-page.less';

class TopicPage extends React.Component {

  componentDidMount() {
    this.loadTopic();
  }
  componentDidUpdate() {
    this.loadTopic();
  }

  loadTopic() {
    this.props.load(this.props.topic.id);
  }

  render() {

    const { data } = this.props.topic;

    return (
      <div className="page">
        <TopicPageHeader
          name={ data.name }
          blurb={ data.blurb }
          color={ data.color }
          image={ data.image }
        />
        <LoadableContent isLoading={ this.props.topic.isFetching }>
          <TopicPageNav sections={ data.sections } />
          <TopicPageContent sections={ data.sections } />
        </LoadableContent>
      </div>
    );
  }

}


export default TopicPage;
