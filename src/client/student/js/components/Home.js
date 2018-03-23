import React from 'react';

import ErrorBoundry from '~/shared/js/components/ErrorBoundry';

import TopicList from './TopicList';
import TopicPage from './TopicPage';
import { SearchPage } from './Search';

const Home = () => {
  return (
    <div className="home">
      <ErrorBoundry>
        <TopicList />
      </ErrorBoundry>
      <ErrorBoundry>
        <TopicPage />
      </ErrorBoundry>
      <ErrorBoundry>
        <SearchPage />
      </ErrorBoundry>
    </div>
  );
};


export default Home;
