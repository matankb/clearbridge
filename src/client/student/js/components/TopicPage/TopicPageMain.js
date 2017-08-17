import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'material-ui/Tabs';

import TopicPageContent from './TopicPageContent';
import TopicPageAsk from './TopicPageAsk';

import { getTextColor } from '../../../../shared/js/utils';

const TopicPageMain = ({ name, color, content }) => {

  const style = {
    background: color,
    color: getTextColor(color),
  };

  return (
    <Tabs>
      <Tab style={ style } label="About"><TopicPageContent content={ content } /></Tab>
      <Tab style={ style } label="Questions"><TopicPageAsk name={ name } /></Tab>
    </Tabs>
  );

};

TopicPageMain.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TopicPageMain;
