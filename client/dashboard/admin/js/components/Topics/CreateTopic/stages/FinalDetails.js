import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { nextCreationStage } from '../../../../actions/topics';

const style = {
  buttonWrap: {
    textAlign: 'right',
  },
  button: {
    marginRight: 10,
  },
};

let First = props => {
  return (
    <div className="first-stage stage">
    <p>Create the tile</p>
    <p>This is what students will see on their dashboard</p>
    <div style={ style.buttonWrap} >
      <FlatButton
        label="Cancel"
        style={ style.button }
      />
      <RaisedButton
        label="Next"
        primary
        style={ style.button }
        onTouchTap={ props.handleNextStage }
      />
    </div>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    handleNextStage: () => dispatch(nextCreationStage()),
  };
}

First = connect(
  mapStateToProps,
  mapDispatchToProps
)(First);

export default First;
