import React from 'react';

import OfflineError from './OfflineError';
import UnauthenticatedError from './UnauthenticatedError';
import NotFoundError from './NotFoundError';
import GenericError from './GenericError';

const Error = ({ error, attempts, retry }) => (
  error.offline ?
    <OfflineError
      attempts={ attempts }
      retry={ retry }
    /> :
  error.status === 403 ?
    <UnauthenticatedError /> :
  error.status === 404 ?
    <NotFoundError /> :
    <GenericError retry={ retry } />
);

export default Error;
