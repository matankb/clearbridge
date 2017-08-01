import React from 'react';

import '../../css/tile.less';

const Tile = ({ children, onClick, style }) => (
  <button
    className="tile"
    style={ style }
    onClick={ onClick }
  >
    { children }
  </button>
);

export default Tile;
