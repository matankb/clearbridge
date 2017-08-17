import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { SUGGESTION, PROBLEM, TOPIC } from '~/shared/js/report';

const TypePicker = ({ onChange, value, style }) => (
  <DropDownMenu
    onChange={ onChange }
    value={ value }
    style={ style }
    labelStyle={{
      overflow: 'visible', // overflow: hidden breaks layout
    }}
  >
    <MenuItem value={ SUGGESTION } primaryText="Suggestion" />
    <MenuItem value={ PROBLEM } primaryText="Problem" />
    <MenuItem value={ TOPIC } primaryText="Topic Idea" />
  </DropDownMenu>
);

export default TypePicker;
