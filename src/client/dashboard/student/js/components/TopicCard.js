import React from 'react';

import { connect } from 'react-redux';
import { selectTopic, toggleTopicPage, requestTopic } from '../actions';

import '../../css/topic-card.less';

const TopicCard = props => (
  <div
    className="topic"
    style={{ backgroundColor: props.color }}
    onClick={ props.handleClick }
    role="button"
    tabIndex={ 0 }
  >
    <img src={ props.image } className="image" alt={ props.name } />
    <div className="name">{ props.name }</div>
  </div>
);

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClick: () => {
      dispatch(selectTopic(ownProps.id));
      dispatch(toggleTopicPage());
      dispatch(requestTopic(ownProps.id));
    },
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(TopicCard);
