import React from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';
import Info from './Info';

let BasicInfo = props => {
  return (
    <div className="top">
      <div className="left">
        <Tile />
      </div>
      <div className="right">
        <Info
          name={ props.name }
          blurb={ props.blurb }
        />
      </div>
    </div>
  );
};

function getTopicById(_id, topics) {
  return topics.filter(t => t._id === _id)[0] || {};
}

function mapStateToProps(state) {
  let topic = getTopicById(state.topics.topicList.selected, state.topics.topicList.topics);
  return {
    name: topic.name,
    blurb: topic.blurb,
  };
}

BasicInfo = connect(
  mapStateToProps
)(BasicInfo);

export default BasicInfo;
