import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const requiresTopicList = Component => {

  const RequiresTopicList = ({ topicListLoaded, topicListError, ...rest }) => {
    if (topicListError) {
      return <Redirect to="/student/" />;
    }
    return <Component topicListLoaded={ topicListLoaded } { ...rest } />;
  };

  RequiresTopicList.displayName = `RequiresTopicList(${Component.displayName || Component.name})`;

  function mapStateToProps(state) {
    return {
      topicListLoaded: !state.topics.isFetchingTopicList,
      topicListError: state.topics.topicListError,
    };
  }

  return connect(mapStateToProps)(RequiresTopicList);

};


export default requiresTopicList;
