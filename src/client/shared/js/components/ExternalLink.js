import React from 'react';

/* eslint-disable jsx-a11y/anchor-has-content */

const ExternalLink = props => (
  <a
    target="_blank"
    rel="noopener"
    { ...props }
  />
);

export default ExternalLink;
