import React from 'react';

import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import style from './error-styles';

const NotFoundError = () => (
  <div style={ style.wrapper }>
    <IconErrorOutline style={ style.icon } /><br />
    <h3 style={ style.title }>Not Found</h3>
    <p style={ style.message }>We can&apos;t seem to find what you&apos;re looking for.</p>
  </div>
);

export default NotFoundError;
