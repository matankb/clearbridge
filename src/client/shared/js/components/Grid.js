import React from 'react';
import PropTypes from 'prop-types';

import '~/shared/css/grid.less';

const Grid = ({ children }) => <div className="grid">{ children }</div>;
const GridTileSmall = ({ children }) => <div className="grid-tile-small">{ children }</div>;
const GridTileWide = ({ children }) => <div className="grid-tile-wide">{ children }</div>;
const GridTileLarge = ({ children }) => <div className="grid-tile-large">{ children }</div>;

const childrenPropTypes = {
  children: PropTypes.node.isRequired,
};

Grid.propTypes = childrenPropTypes;
GridTileSmall.propTypes = childrenPropTypes;
GridTileWide.propTypes = childrenPropTypes;
GridTileLarge.propTypes = childrenPropTypes;

export default Grid;
export { GridTileSmall, GridTileWide, GridTileLarge };
