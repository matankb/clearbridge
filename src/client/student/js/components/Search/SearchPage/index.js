import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import SearchPage from './SearchPage';

const SearchPageWrap = props => (

  <TransitionGroup>
    <CSSTransition
      classNames="search-page"
      timeout={ 300 }
      key={ props.location.pathname }
    >
      <Switch location={ props.location }>
        <Route
          path="/student/search/"
          component={ SearchPage }
        />
        { /* react-transition-group doesn't like null children, so render a fallback */ }
        <Route render={ () => <div /> } />
      </Switch>
    </CSSTransition>
  </TransitionGroup>

);

SearchPageWrap.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(SearchPageWrap);
