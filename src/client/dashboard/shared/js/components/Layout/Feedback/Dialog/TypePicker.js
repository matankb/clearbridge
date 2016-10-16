import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { SUGGESTION, PROBLEM } from '../../../../report';

const TypePicker = ({ onChange, value, style }) => (
  <DropDownMenu onChange={ onChange } value={ value } style={ style }>
    <MenuItem value={ SUGGESTION } primaryText="Suggestion" />
    <MenuItem value={ PROBLEM } primaryText="Problem" />
  </DropDownMenu>
);

export default TypePicker;
