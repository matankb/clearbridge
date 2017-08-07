import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import TopicPage from './TopicPage';

const TopicPageWrap = props => {

  return (
    <CSSTransitionGroup
      className="topic-page"
      transitionName="topic-page"
      transitionEnterTimeout={ 300 }
      transitionLeaveTimeout={ 300 }
      component="div"
    >
      <Route
        path="/student/topic/:id/"
        location={ props.location }
        key={ props.location.key }
        component={ TopicPage }
      />
    </CSSTransitionGroup>
  );

};


export default withRouter(TopicPageWrap);
