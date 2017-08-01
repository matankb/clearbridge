import React from 'react';
import tinycolor from 'tinycolor2';

const TopicPageHeader = ({ name, blurb, color, image }) => {

  const textColor = tinycolor(color).isLight() ? 'black' : 'white';

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

export default TopicPageHeader;
