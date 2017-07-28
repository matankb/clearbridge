import React from 'react';

const TopicPageHeader = ({ name, blurb, color, image }) => (
  <div className="header" style={{ backgroundColor: color }}>
    <div className="left">
      <img src={ image } alt={ name } />
    </div>
    <div className="right">
      <h1 className="title">{ name }</h1>
      <p className="subtitle">OVERVIEW</p>
      <p className="blurb">
        { blurb }
      </p>
    </div>
  </div>
);

export default TopicPageHeader;
