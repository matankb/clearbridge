import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import TopicPage from './TopicPage';

const TopicPageWrap = ({ location }) => (

  <CSSTransitionGroup
    transitionName="topic-page"
    transitionEnterTimeout={ 300 }
    transitionLeaveTimeout={ 300 }
    component="div"
  >
    <Route
      path="/student/topic/:id/"
      location={ location }
      key={ location.key }
      component={ TopicPage }
    />
  </CSSTransitionGroup>

);

TopicPageWrap.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(TopicPageWrap);
