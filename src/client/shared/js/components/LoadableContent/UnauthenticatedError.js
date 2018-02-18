import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import style from './error-styles';

const UnauthenticatedError = () => (
  <div style={ style.wrapper }>
    <IconErrorOutline style={ style.icon } /><br />
    <h3 style={ style.title }>You are not logged in.</h3>
    <FlatButton
      label="Log In"
      primary
      hoverColor="transparent"
      onClick={ () => { location.href = `/auth/?returnTo=${encodeURIComponent(location.href)}`; } }
    />
  </div>
);

export default UnauthenticatedError;
