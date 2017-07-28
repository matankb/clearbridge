import React from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import TopicPage from './TopicPage';

const TopicPageWrap = props => {

  let renderedChild = props.open ? <TopicPage topic={ props.topic } key={ 0 } /> : null;

  return (
    <CSSTransitionGroup
      className="topic-page"
      transitionName="topic-page"
      transitionEnterTimeout={ 300 }
      transitionLeaveTimeout={ 300 }
      component="div"
    >
      { renderedChild }
    </CSSTransitionGroup>
  );

};

function getTopicById(id, topics) {
  return topics.find(topic => topic.id === id);
}

function mapStateToProps(state) {
  let topic = getTopicById(state.topics.selectedTopic, state.topics.topics);
  return {
    open: state.topics.topicPageOpen,
    topic,
  };
}

export default connect(
  mapStateToProps,
)(TopicPageWrap);
