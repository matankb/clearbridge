import React from 'react';

import TopicList from './TopicList';
import TopicPage from './TopicPage';
import { SearchPage } from './Search';

const Home = () => {
  return (
    <div className="home">
      <TopicList />
      <TopicPage />
      <SearchPage />
    </div>
  );
};

export default Home;
