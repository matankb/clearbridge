import React from 'react';

import Grid, {
  GridTileSmall as SmallTile,
  GridTileWide as WideTile,
  GridTileLarge as LargeTile,
} from '../../../../shared/js/components/Grid';

import '../../../../shared/css/grid.less';

const GridLayout = ({ items }) => {
  return (
    <Grid>
      {
        items[0] ?
          <LargeTile>
            { items[0] }
          </LargeTile> :
        null
      }
      {
        items[1] ?
          <LargeTile>
            <WideTile>
              <SmallTile>{ items[1] }</SmallTile>
              <SmallTile>{ items[2] }</SmallTile>
            </WideTile>
            <WideTile>{ items[3] }</WideTile>
          </LargeTile> :
        null
      }
      {
        items[4] ?
          <LargeTile>
            <WideTile>
              { items[4] }
            </WideTile>
            <WideTile>
              <SmallTile>{ items[5] }</SmallTile>
              <SmallTile>{ items[6] }</SmallTile>
            </WideTile>
          </LargeTile> :
        null
      }
      {
        items[7] ?
          <LargeTile>
            <WideTile>
              <SmallTile>{ items[7] }</SmallTile>
              <SmallTile>{ items[8] }</SmallTile>
            </WideTile>
            <WideTile>
              <SmallTile>{ items[9] }</SmallTile>
              <SmallTile>{ items[10] }</SmallTile>
            </WideTile>
          </LargeTile> :
        null
      }
      {
        items[11] ?
          <LargeTile>
            <WideTile>
              <SmallTile>{ items[11] }</SmallTile>
              <SmallTile>{ items[12]}</SmallTile>
            </WideTile>
            <WideTile>
              { items[13] }
            </WideTile>
          </LargeTile> :
        null
      }
      {
        items[14] ?
          <LargeTile>
            { items[14] }
          </LargeTile> :
        null
      }
      {
        items[15] ?
          <LargeTile>
            <WideTile>{ items[15] }</WideTile>
            <WideTile>{ items[16] }</WideTile>
          </LargeTile> :
        null
      }
      {
        items[16] ?
          <LargeTile>
            { items[16] }
          </LargeTile> :
        null
      }
    </Grid>
  );
};

export default GridLayout;
