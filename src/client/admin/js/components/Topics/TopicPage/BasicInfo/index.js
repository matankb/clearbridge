import React from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';
import Info from './Info';

import { getTopicById } from '../../../../../../shared/js/utils';

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

function mapStateToProps(state) {
  let topic = getTopicById(state.topics.topicList.topics, state.topics.topicList.selected) || {};
  return {
    name: topic.name,
    blurb: topic.blurb,
  };
}

BasicInfo = connect(
  mapStateToProps,
)(BasicInfo);

export default BasicInfo;
