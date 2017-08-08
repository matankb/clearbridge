import React from 'react';
import { Link } from 'react-router-dom';

const AppLink = ({ to, ...rest }) => (
  <Link
    to={{ pathname: to, state: { inApp: true } }}
    { ...rest }
  />
);

export default AppLink;
