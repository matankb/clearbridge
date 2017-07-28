import React from 'react';
import Tile from '../Tile';

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
    <img src="https://goo.gl/enkb9a" className="image" alt="" />
    <div className="name" style={ style.name }>Suggest Topic</div>
  </Tile>
);

export default TopicSuggestCard;
