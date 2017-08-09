import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import SearchPage from './SearchPage';

const SearchPageWrap = props => (

  <CSSTransitionGroup
    transitionName="search-page"
    transitionEnterTimeout={ 300 }
    transitionLeaveTimeout={ 300 }
    component="div"
  >
    <Route
      path="/student/search/"
      location={ props.location }
      key={ props.location.pathname }
      component={ SearchPage }
    />
  </CSSTransitionGroup>

);

SearchPageWrap.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(SearchPageWrap);
