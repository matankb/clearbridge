import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconCloudOff from 'material-ui/svg-icons/file/cloud-off';

import style from './error-styles';

const BASE_TIME = 5;

class OfflineError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: (2 ** props.attempts) * BASE_TIME,
    };
    this.timer = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    this.clear();
  }

  updateTime = () => {
    this.setState(({ time }) => ({
      time: time - 1,
    }));
    if (this.state.time <= 0) {
      this.props.retry();
      this.clear();
    }
  }

  clear() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div style={ style.wrapper } >
        <IconCloudOff style={ style.icon } /> <br />
        <p style={ style.title } >
          Not connected. Retrying in { this.state.time } seconds.
        </p>
        <FlatButton
          label="Try Again"
          primary
          hoverColor="transparent"
          onTouchTap={ this.props.retry }
        />
      </div>
    );
  }
}

export default OfflineError;
