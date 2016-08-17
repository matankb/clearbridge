import React from 'react';

import Tile from './Tile';
import Info from './Info';

const BasicInfo = () => {
  return (
    <div className="top">
      <div className="left">
        <Tile />
      </div>
      <div className="right">
        <Info />
      </div>
    </div>
  );
};

export default BasicInfo;
