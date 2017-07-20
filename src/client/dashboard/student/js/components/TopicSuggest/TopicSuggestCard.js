import React from 'react';

const style = {
  topic: {
    background: '#e8380a',
  },
  name: {
    background: 'transparent',
    fontSize: 18,
  },
};

const TopicSuggestCard = ({ onClick }) => (
  <div className="topic" style={ style.topic } onClick={ onClick }>
    <img src="https://goo.gl/enkb9a" className="image" />
    <div className="name" style={ style.name }>Suggest Topic</div>
  </div>
);

export default TopicSuggestCard;
