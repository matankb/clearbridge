import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

import sendReport, { ERROR } from '~/shared/js/report';

const style = {
  wrap: {
    padding: 10,
  },
  button: {
    marginLeft: 10,
  },
};

class ErrorBoundry extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  state = {
    hasError: false,
  }

  async componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // prevent error in sendReport from stopping error report render
    try {
      if (process.env.NODE_ENV === 'production') {
        // generate error string
        const errorString = `Error: ${error} Component Stack: ${info.componentStack}`;
        await sendReport(ERROR, { error: errorString });
      }
    } catch (e) {
      // swallow - something went wrong with error reporting, so reporting agains will
      // likely cause loop
      // TODO: find better solution to this
    }

  }

  render() {

    if (this.state.hasError) {
      return (
        <div style={ style.wrap }>
          There was an issue displaying this
          <FlatButton
            label="Reload"
            style={ style.button }
            onClick={ () => window.location.reload() }
          />
        </div>
      );
    }

    return this.props.children;
  }

}

export default ErrorBoundry;
