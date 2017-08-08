import React from 'react';

import lightbulbImage from '../../../assets/lightbulb.png';

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
  <button className="tile" style={ style.topic } onClick={ onClick }>
    <img src={ lightbulbImage } alt="lightblulb" className="image" />
    <div className="name" style={ style.name }>Suggest Topic</div>
  </button>
);

export default TopicSuggestCard;
