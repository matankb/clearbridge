import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPropTypes from '~/shared/js/constants/prop-types';
import withFetchAction from '~/shared/js/hocs/fetch-actions';
import { getTopicById } from '~/shared/js/utils';

import '~/student/css/ask.less';

import AskForm from './AskForm';
import AskList from './AskList';


const TopicPageAsk = ({ name, asks }) => (
  <div className="ask">
    <AskForm name={ name} />
    <AskList asks={ asks } />
  </div>
);

TopicPageAsk.propTypes = {
  name: PropTypes.string.isRequired,
  asks: PropTypes.arrayOf(AppPropTypes.ask).isRequired,
};

function mapStateToProps(state, ownProps) {
  const topic = getTopicById(state.topics.topics, ownProps.id);
  return {
    name: topic.data.name,
    asks: topic.data.asks,
  };
}

export default withFetchAction(connect(mapStateToProps)(TopicPageAsk));
