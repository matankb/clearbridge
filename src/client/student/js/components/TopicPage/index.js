import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import TopicPage from './TopicPage';

const TopicPageWrap = ({ location }) => (

  <TransitionGroup>
    <CSSTransition
      classNames="topic-page"
      timeout={ 300 }
      key={ location.key }
    >
      <Switch location={ location }>
        <Route
          path="/student/topic/:id/"
          component={ TopicPage }
        />
        { /* react-transition-group doesn't like null children, so render a fallback */ }
        <Route render={ () => <div /> } />
      </Switch>
    </CSSTransition>
  </TransitionGroup>

);

TopicPageWrap.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(TopicPageWrap);
