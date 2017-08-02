import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { nextCreationStage, setCreationStatus, setCreationData } from '../../../../actions/topics';

const style = {
  textField: {
    display: 'block',
  },
};

let First = props => {
  return (
    <div className="stage">
      <TextField
        style={ style.textField }
        hintText='e.g. "Food Policy"'
        floatingLabelText="Name"
        fullWidth
        value={ props.name }
        onChange={ props.handleNameChange }
      />
      <TextField
        style={ style.textField }
        multiLine
        rows={ 4 }
        fullWidth
        floatingLabelText="Blurb"
        value={ props.blurb }
        onChange={ props.handleBlurbChange }
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    name: state.topics.create.data.name,
    topics: state.topics.create.data.blurb,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNameChange: e => {
      dispatch(setCreationData({ name: e.target.value }));
    },
    handleBlurbChange: e => {
      dispatch(setCreationData({ blurb: e.target.value }));
    },
  };
}

First = connect(
  mapStateToProps,
  mapDispatchToProps,
)(First);

export default First;
