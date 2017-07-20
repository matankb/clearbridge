import React from 'react';

import '../../css/grid.less';

const Grid = ({ children }) => <div className="grid">{ children }</div>;
const GridTileSmall = ({ children }) => <div className="grid-tile-small">{ children }</div>;
const GridTileWide = ({ children }) => <div className="grid-tile-wide">{ children }</div>;
const GridTileLarge = ({ children }) => <div className="grid-tile-large">{ children }</div>;

export default Grid;
export { GridTileSmall, GridTileWide, GridTileLarge };
