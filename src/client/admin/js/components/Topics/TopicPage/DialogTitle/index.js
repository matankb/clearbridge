import { connect } from 'react-redux';
import Buttons from './Buttons';

import {
  toggleTopicPage,
} from '../../../../actions/topics';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    handleClose: () => dispatch(toggleTopicPage()),
  };
}

const Actions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Buttons);

export default Actions;
