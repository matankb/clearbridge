import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import sendReport, { ERROR } from '~/shared/js/report';

class ErrorNotification extends React.Component {

  state = {
    open: false,
  }

  componentDidMount() {
    window.onerror = this.handleError;
  }

  handleError = async (msg, url, ln, col, error) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        await sendReport(ERROR, { error: error ? error.stack : msg });
      }
    } finally {
      this.setState({ open: true });
    }
  }
  handleToastClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <Snackbar
        message="There was an error"
        action="Reload"
        open={ this.state.open }
        autoHideDuration={ 5000 }
        onRequestClose={ this.handleToastClose }
        onActionTouchTap={ () => location.reload() }
      />
    );
  }

}

export default ErrorNotification;
