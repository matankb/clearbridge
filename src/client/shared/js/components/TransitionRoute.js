import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TransitionRoute = ({
  match, location, history, getLocationKey, classNames, timeout, ...props
}) => (
  <TransitionGroup>
    <CSSTransition
      classNames={ classNames }
      timeout={ timeout }
      key={ getLocationKey(location) }
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
  getLocationKey: PropTypes.func,
  classNames: PropTypes.oneOf([PropTypes.string, PropTypes.object]).isRequired,
  timeout: PropTypes.oneOf([PropTypes.number, PropTypes.object]).isRequired,
};

TransitionRoute.defaultProps = {
  getLocationKey: location => location.key,
};

export default withRouter(TransitionRoute);
