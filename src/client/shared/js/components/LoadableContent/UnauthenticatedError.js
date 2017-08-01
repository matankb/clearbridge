import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import style from './error-styles';

const UnauthenticatedError = () => (
  <div style={ style.wrapper }>
    <IconErrorOutline style={ style.icon } /><br />
    <p style={ style.message }>You are not logged in.</p>
    <FlatButton
      label="Log In"
      primary
      hoverColor="transparent"
      onTouchTap={ () => { window.location = '/auth/'; } }
    />
  </div>
);

export default UnauthenticatedError;
