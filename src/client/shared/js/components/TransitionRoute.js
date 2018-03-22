import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TransitionRoute = ({
  match, location, history, classNames, timeout, ...props
}) => (
  <TransitionGroup>
    <CSSTransition
      classNames={ classNames }
      timeout={ timeout }
      key={ location.key }
    >
      <Switch location={ location }>
        <Route {...props} />
        { /* react-transition-group doesn't like null children, so render a fallback */ }
        <Route render={ () => <div /> } />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

TransitionRoute.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
};

export default withRouter(TransitionRoute);
