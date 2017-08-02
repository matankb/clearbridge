import { connect } from 'react-redux';

import Buttons from './Buttons';
import {
  nextCreationStage,
  setCreationStatus,
  resetCreationData,
  selectCreationStage,
  postTopic,
} from '../../../../actions/topics';

function mapStateToProps(state, ownProps) {
  return {
    final: state.topics.create.stage === ownProps.stages - 1,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNextStage: () => dispatch(nextCreationStage()),
    handleCancel: () => {
      dispatch(setCreationStatus(false));
      dispatch(resetCreationData());
      dispatch(selectCreationStage(0));
    },
    handleCreate: () => {
      dispatch(postTopic());
      dispatch(setCreationStatus(false));
      dispatch(resetCreationData());
      dispatch(selectCreationStage(0));
    },
  };
}

const actions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Buttons);

export default actions;
