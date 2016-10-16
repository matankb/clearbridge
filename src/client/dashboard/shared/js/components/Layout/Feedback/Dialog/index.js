import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import TypePicker from './TypePicker';
import { SUGGESTION, PROBLEM } from '../../../../report';

import { dialogTitle } from '../../../../constants/styles';

const placeholders = {
  [SUGGESTION]: 'Share your ideas',
  [PROBLEM]: 'Describe your issue',
};

const style = {
  dialog: {
    width: '40%',
  },
  title: {

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
      <TypePicker
        onChange={ handleTypeChange }
        value={ props.type }
      />
      <br />
      <TextField
        rows={ 4 }
        placeholder={ placeholders[type] }
        onChange={ handleCommentChange }
        value={ comment }
      />
      <br />
      { buttons }
    </Dialog>
  );
};

export default FeedbackDialog;
