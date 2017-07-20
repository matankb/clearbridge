import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AboutText from './AboutText';

import { dialogTitle as dialogTitleStyle } from '../../constants/styles';

class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }

  render() {

    const actionButtons = [
      <FlatButton label="close" primary onTouchTap={ this.close.bind(this) } />,
    ];

    return (
      <div className="about">
        <span
          onClick={ this.open.bind(this) }
        >
          { this.props.children }
        </span>
        <Dialog
          open={ this.state.open }
          title="About"
          titleStyle={ dialogTitleStyle }
          modal={ false }
          onRequestClose={ this.close.bind(this) }
          actions={ actionButtons }
        >
          <AboutText />
        </Dialog>
      </div>
    );
  }

}

export default About;
