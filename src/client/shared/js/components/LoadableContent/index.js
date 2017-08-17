import React from 'react';
import PropTypes from 'prop-types';

import AppPropTypes from '~/shared/js/constants/prop-types';

import Throbber from './Throbber';
import Error from './Error';

class LoadableContent extends React.Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: AppPropTypes.error,
    retry: PropTypes.func.isRequired,

    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  state = {
    attempts: 0,
  }

  retry = () => {
    this.props.retry();
    this.setState(({ attempts }) => ({
      attempts: attempts + 1,
    }));
  }

  render() {
    return (
      <div>
        {
          this.props.isLoading ?
            <Throbber /> :
            this.props.error ?
              <Error
                error={ this.props.error }
                retry={ this.retry }
                attempts={ this.state.attempts }
              /> :
              this.props.children
        }
      </div>
    );
  }

}

export default LoadableContent;
