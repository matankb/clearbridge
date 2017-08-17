import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';

import AppPropTypes from '~/shared/js/constants/prop-types';

const style = {
  progress: { backgroundColor: 'black' },
  error: { color: 'rgb(228, 90, 81)' },
};

const FetchingToast = ({ message }) => (
  <Snackbar
    open
    message={<span><LinearProgress style={ style.progress } />{ message }</span>}
  />
);
FetchingToast.propTypes = {
  message: PropTypes.string.isRequired,
};

const FetchedToast = ({ message }) => (
  <Snackbar open autoHideDuration={ 2000 } message={ message } />
);
FetchedToast.propTypes = {
  message: PropTypes.string.isRequired,
};

const ErrorToast = ({ message }) => (
  <Snackbar
    open
    message={ <span style={ style.error }>
      { message }
    </span> }
  />
);
ErrorToast.propTypes = {
  message: PropTypes.string.isRequired,
};

const StatusToast = ({ fetching,
  fetched,
  error,
  fetchingMessage,
  fetchedMessage,
  errorMessage,
}) => {
  if (fetching) {
    return <FetchingToast message={ fetchingMessage } />;
  } else if (fetched) {
    return <FetchedToast message={ fetchedMessage } />;
  } else if (error) {
    return <ErrorToast message={ errorMessage } />;
  } else {
    return null;
  }
};

StatusToast.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  error: AppPropTypes.error,

  fetchingMessage: PropTypes.string,
  fetchedMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

StatusToast.defaultProps = {
  error: null,

  fetchingMessage: 'Sending...',
  fetchedMessage: 'Sent!',
  errorMessage: 'Error',
};

export default StatusToast;
