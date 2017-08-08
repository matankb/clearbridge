import React from 'react';
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
      key={ props.location.key }
      component={ SearchPage }
    />
  </CSSTransitionGroup>

);

export default withRouter(SearchPageWrap);
