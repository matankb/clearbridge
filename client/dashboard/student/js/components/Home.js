import React from 'react';

import TopicList from './TopicList';
import TopicPage from './TopicPage';

const Home = () => {
  return (
    <div className="home">
      <TopicList />
      <TopicPage />
    </div>
  );
};

export default Home;
