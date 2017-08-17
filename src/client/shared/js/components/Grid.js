import React from 'react';

import '~/shared/css/grid.less';

const Grid = ({ children }) => (children ? <div className="grid">{ children }</div> : null);
const GridTileSmall = ({ children }) => (children ? <div className="grid-tile-small">{ children }</div> : null);
const GridTileWide = ({ children }) => (children ? <div className="grid-tile-wide">{ children }</div> : null);
const GridTileLarge = ({ children }) => (children ? <div className="grid-tile-large">{ children }</div> : null);

export default Grid;
export { GridTileSmall, GridTileWide, GridTileLarge };
