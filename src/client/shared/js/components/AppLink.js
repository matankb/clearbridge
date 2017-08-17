import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const AppLink = ({ to, ...rest }) => (
  <Link
    to={{ pathname: to, state: { inApp: true } }}
    { ...rest }
  />
);

AppLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default AppLink;
