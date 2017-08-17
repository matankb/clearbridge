import React from 'react';
import PropTypes from 'prop-types';

import { getTextColor } from '~/shared/js/utils';

const TopicPageHeader = ({ name, color, image }) => {

  const textColor = getTextColor(color);

  return (
    <div className="header" style={{ backgroundColor: color }}>
      <div className="left">
        <img src={ image } alt={ name } />
      </div>
      <div className="right">
        <h1 className="title" style={{ color: textColor }}>{ name }</h1>
      </div>
    </div>
  );

};

TopicPageHeader.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TopicPageHeader;
