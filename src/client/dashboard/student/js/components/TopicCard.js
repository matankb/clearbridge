import React from 'react';

import { connect } from 'react-redux';
import { selectTopic, openTopicPage, requestTopic } from '../actions';

import Tile from './Tile';

const TopicCard = props => (
  <Tile
    onClick={ props.handleClick }
    style={{ backgroundColor: props.color }}
  >
    <img src={ props.image } className="image" alt={ props.name } />
    <div className="name">{ props.name }</div>
  </Tile>
);

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClick: () => {
      dispatch(requestTopic(ownProps.id));
      dispatch(selectTopic(ownProps.id));
      dispatch(openTopicPage());
    },
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(TopicCard);
