import React from 'react';
import TransitionRoute from '~/shared/js/components/TransitionRoute';
import SearchPage from './SearchPage';

const SearchPageWrap = () => (
  <TransitionRoute
    path="/student/search/"
    component={ SearchPage }
    classNames="search-page"
    timeout={ 300 }
  />
);

export default SearchPageWrap;
