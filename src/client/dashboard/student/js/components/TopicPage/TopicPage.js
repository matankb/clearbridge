import React from 'react';

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
      <TopicPageNav sections={ data.sections } />
      <TopicPageContent sections={ data.sections } />
    </div>

  );
};


export default TopicPage;
