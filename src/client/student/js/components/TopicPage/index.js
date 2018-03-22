import React from 'react';
import TransitionRoute from '~/shared/js/components/TransitionRoute';
import TopicPage from './TopicPage';

const TopicPageWrap = () => (
  <TransitionRoute
    path="/student/topic/:id"
    component={ TopicPage }
    classNames="topic-page"
    timeout={ 300 }
  />
);

export default TopicPageWrap;
