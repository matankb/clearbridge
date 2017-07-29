import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import style from './error-styles';

const GenericError = ({ retry }) => (
  <div style={ style.wrapper }>
    <IconErrorOutline style={ style.icon } /><br />
    <p style={ style.message }>There was an error</p>
    <FlatButton
      label="Try Again"
      primary
      hoverColor="transparent"
      onTouchTap={ retry }
    />
  </div>
);

export default GenericError;
