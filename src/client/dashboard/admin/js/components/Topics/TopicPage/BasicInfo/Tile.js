import React from 'react';
import { connect } from 'react-redux';

let Tile = props => {
  return (
    <div
      className="tile"
      style={{ backgroundColor: props.color }}
    >
      <img src={ props.image } />
    </div>
  );
};

function mapStateToProps(state) {

  let topic = state.topics.topicList.topics.filter(t => {
    return t._id === state.topics.topicList.selected;
  })[0];

  return {
    image: topic.image,
    color: topic.color,
  };

}

Tile = connect(
  mapStateToProps
)(Tile);

export default Tile;
