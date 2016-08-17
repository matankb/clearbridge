import React from 'react';

import BasicInfo from './BasicInfo';
import AddUsers from './AddUsers/';
import CreateTile from './CreateTile';

const stages = [
  {
    name: 'Basic Information',
    component: <BasicInfo />,
  },
  {
    name: 'Add Users',
    component: <AddUsers />,
  },
  {
    name: 'Create Tile',
    component: <CreateTile />,
  },
];

export default stages;
