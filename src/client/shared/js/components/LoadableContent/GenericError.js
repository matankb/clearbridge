import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';
import IconErrorOutline from 'material-ui/svg-icons/alert/error-outline';

import style from './error-styles';

const GenericError = ({ retry }) => (
  <div style={ style.wrapper }>
    <IconErrorOutline style={ style.icon } /><br />
    <h3 style={ style.title }>There was an error</h3>
    <FlatButton
      label="Try Again"
      primary
      hoverColor="transparent"
      onTouchTap={ retry }
    />
  </div>
);

GenericError.propTypes = {
  retry: PropTypes.func.isRequired,
};

export default GenericError;
