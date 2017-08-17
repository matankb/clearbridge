import React from 'react';
import PropTypes from 'prop-types';

import AskForm from './AskForm';
import AskList from './AskList';

import AppPropTypes from '../../../../../shared/js/constants/prop-types';
import '../../../../css/ask.less';

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

export default TopicPageAsk;
