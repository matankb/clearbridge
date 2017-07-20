import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import TypePicker from './TypePicker';
import { SUGGESTION, PROBLEM } from '../../../report';

import { dialogTitle } from '../../../constants/styles';

const placeholders = {
  [SUGGESTION]: 'Share your ideas',
  [PROBLEM]: 'Describe your issue',
};

const style = {
  dialog: {
    width: '40%',
  },
  label: {
    marginLeft: 20,
  },
  typePicker: {
    width: '75%',
    marginBottom: 20,
  },
  comment: {
    marginLeft: 20,
    width: '90%',
  },
};

const FeedbackDialog = props => {

  let { close, send, openState, handleTypeChange, handleCommentChange, type, comment } = props;

  const buttons = [
    <FlatButton
      key={ 0 }
      label="Cancel"
      onTouchTap={ close }
    />,
    <FlatButton
      key={ 1 }
      label="Send"
      primary
      onTouchTap={ send }
    />,
  ];

  return (
    <Dialog
      open={ openState }
      title="Feedback"
      contentStyle={ style.dialog }
      titleStyle={ dialogTitle }
    >
      <br />
      <span style={ style.label }>Select Type:</span>
      <TypePicker
        onChange={ handleTypeChange }
        value={ props.type }
        style={ style.typePicker }
      />
      <br />
      <TextField
        multiLine
        rows={ 4 }
        placeholder={ placeholders[type] }
        onChange={ handleCommentChange }
        value={ comment }
        style={ style.comment }
      />
      <br />
      { buttons }
    </Dialog>
  );
};

export default FeedbackDialog;
