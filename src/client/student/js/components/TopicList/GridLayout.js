import React from 'react';
import PropTypes from 'prop-types';

import Grid, {
  GridTileSmall as SmallTile,
  GridTileWide as WideTile,
  GridTileLarge as LargeTile,
} from '../../../../shared/js/components/Grid';

import '../../../../shared/css/grid.less';

const BATCH_SIZE = 17;

const GridLayout = ({ items }) => {

  const children = [];

  for (let i = 0; i < items.length / BATCH_SIZE; i++) {
    const batch = BATCH_SIZE * i;
    children.push(
      items[batch + 0] &&
        <LargeTile key={ batch + 0 }>{ items[batch + 0] }</LargeTile>,

      items[batch + 1] &&
        <LargeTile key={ batch + 1 }>
          <WideTile>
            <SmallTile>{ items[batch + 1] }</SmallTile>
            <SmallTile>{ items[batch + 2] }</SmallTile>
          </WideTile>
          <WideTile>{ items[batch + 3] }</WideTile>
        </LargeTile>,

      items[batch + 4] &&
        <LargeTile key={ batch + 4 }>
          <WideTile>
            { items[batch + 4] }
          </WideTile>
          <WideTile>
            <SmallTile>{ items[batch + 5] }</SmallTile>
            <SmallTile>{ items[batch + 6] }</SmallTile>
          </WideTile>
        </LargeTile>,

      items[batch + 7] &&
        <LargeTile key={ batch + 7 }>
          <WideTile>
            <SmallTile>{ items[batch + 7] }</SmallTile>
            <SmallTile>{ items[batch + 8] }</SmallTile>
          </WideTile>
          <WideTile>
            <SmallTile>{ items[batch + 9] }</SmallTile>
            <SmallTile>{ items[batch + 10] }</SmallTile>
          </WideTile>
        </LargeTile>,

      items[batch + 11] &&
        <LargeTile key={ batch + 11 }>
          <WideTile>
            <SmallTile>{ items[batch + 11] }</SmallTile>
            <SmallTile>{ items[batch + 12]}</SmallTile>
          </WideTile>
          <WideTile>
            { items[batch + 13] }
          </WideTile>
        </LargeTile>,

      items[batch + 14] &&
        <LargeTile key={ batch + 14 }>
          { items[batch + 14] }
        </LargeTile>,

      items[batch + 15] &&
        <LargeTile key={ batch + 15 }>
          <WideTile>{ items[batch + 15] }</WideTile>
          <WideTile>{ items[batch + 16] }</WideTile>
        </LargeTile>,

      items[batch + 16] &&
        <LargeTile key={ batch + 16 }>
          { items[batch + 16] }
        </LargeTile>,
    );
  }

  return (
    <Grid>
      { children }
    </Grid>
  );
};

GridLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default GridLayout;
