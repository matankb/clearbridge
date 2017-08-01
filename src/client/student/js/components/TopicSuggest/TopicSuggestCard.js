import React from 'react';
import Tile from '../Tile';

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
  <Tile className="topic" style={ style.topic } onClick={ onClick }>
    <img src={ lightbulbImage } alt="lightblulb" className="image" />
    <div className="name" style={ style.name }>Suggest Topic</div>
  </Tile>
);

export default TopicSuggestCard;
