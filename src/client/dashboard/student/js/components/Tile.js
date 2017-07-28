import React from 'react';

import '../../css/tile.less';

const Tile = ({ children, onClick, style }) => (
  <div
    className="tile"
    style={ style }
    onClick={ onClick }
    role="button"
    tabIndex={ 0 }
  >
    { children }
  </div>
);

export default Tile;
