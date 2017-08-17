import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { dialogTitle as dialogTitleStyle } from '~/shared/js/constants/styles';
import { closeAbout } from '~/shared/js/reducers/about';

import AboutText from './AboutText';

const About = props => (
  <Dialog
    open={ props.open }
    title="About"
    titleStyle={ dialogTitleStyle }
    modal={ false }
    onRequestClose={ props.handleClose }
    actions={ [<FlatButton label="close" primary onTouchTap={ props.handleClose } />] }
    autoScrollBodyContent
  >
    <AboutText />
  </Dialog>
);

export default connect(
  state => ({ open: state.about.open }),
  dispatch => ({ handleClose: () => dispatch(closeAbout()) }),
)(About);
