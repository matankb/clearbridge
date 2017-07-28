import React from 'react';

import LoadableContent from '../../../../shared/js/components/LoadableContent';

import TopicPageHeader from './TopicPageHeader';
import TopicPageNav from './TopicPageNav';
import TopicPageContent from './TopicPageContent';

import '../../../css/topic-page.less';

const TopicPage = props => {

  const { data } = props.topic;

  return (
    <div className="page">
      <TopicPageHeader
        name={ data.name }
        blurb={ data.blurb }
        color={ data.color }
        image={ data.image }
      />
      <LoadableContent isLoading={ props.topic.isFetching }>
        <TopicPageNav sections={ data.sections } />
        <TopicPageContent sections={ data.sections } />
      </LoadableContent>
    </div>

  );
};


export default TopicPage;
