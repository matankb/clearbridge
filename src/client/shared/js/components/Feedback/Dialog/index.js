import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { SUGGESTION, PROBLEM, TOPIC } from '~/shared/js/report';

import { dialogTitle } from '~/shared/js/constants/styles';

import TypePicker from './TypePicker';

const placeholders = {
  [SUGGESTION]: 'Share your ideas',
  [PROBLEM]: 'Describe your issue',
  [TOPIC]: 'Suggest a topic',
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

const FeedbackDialog = ({
  close, send, openState, handleTypeChange, handleCommentChange, type, comment,
}) => {

  const buttons = [
    <FlatButton
      key={ 0 }
      label="Cancel"
      onClick={ close }
    />,
    <FlatButton
      key={ 1 }
      label="Send"
      primary
      onClick={ send }
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
        value={ type }
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
        name="comment"
      />
      <br />
      { buttons }
    </Dialog>
  );
};

FeedbackDialog.propTypes = {
  openState: PropTypes.bool.isRequired,

  type: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,

  handleTypeChange: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,

  close: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
};

export default FeedbackDialog;
