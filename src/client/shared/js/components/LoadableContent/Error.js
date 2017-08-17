import React from 'react';
import PropTypes from 'prop-types';

import AppPropTypes from '~/shared/js/constants/prop-types';

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

Error.propTypes = {
  error: AppPropTypes.error.isRequired,
  attempts: PropTypes.number.isRequired,
  retry: PropTypes.func.isRequired,
};

export default Error;
