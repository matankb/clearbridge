import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'material-ui/Tabs';

import TopicPageContent from './TopicPageContent';
import TopicPageAsk from './TopicPageAsk';

import { getTextColor } from '../../../../shared/js/utils';


const TopicPageMain = ({ id, color, content }) => {

  const style = {
    tab: {
      background: color,
      color: getTextColor(color),
    },
    inkBar: {
      background: getTextColor(color),
      transitionDuration: '200ms', // increase animation speed
    },
  };

  return (
    <Tabs inkBarStyle={style.inkBar}>
      <Tab style={ style.tab } label="About"><TopicPageContent content={ content } /></Tab>
      <Tab style={ style.tab } label="Questions"><TopicPageAsk id={ id } /></Tab>
    </Tabs>
  );

};

TopicPageMain.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

TopicPageMain.defaultProps = {
  id: '', // TODO: react warns about id being undefined, not sure why.
};

export default TopicPageMain;
