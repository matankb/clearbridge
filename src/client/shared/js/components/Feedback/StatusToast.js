import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  progress: { backgroundColor: 'black' },
  error: { color: 'rgb(228, 90, 81)' },
};

const SendingToast = () => (
  <Snackbar
    open
    message={<span><LinearProgress style={ style.progress } />Sending Feedback...</span>}
  />
);

const SentToast = () => (
  <Snackbar open autoHideDuration={ 2000 } message="Feedback Sent!" />
);

const ErrorToast = () => (
  <Snackbar
    open
    message={ <span style={ style.error }>
      Error sending feedback. Please try again in a moment.
    </span> }
  />
);

const StatusToast = ({ status }) => {
  switch (status) {
    case 'SENDING':
      return <SendingToast />;
    case 'SENT':
      return <SentToast />;
    case 'ERROR':
      return <ErrorToast />;
    default:
      return null;
  }
};

StatusToast.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusToast;
