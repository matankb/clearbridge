import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const style = {
  paperWrap: {
    padding: '0px 30px 20px 30px',
    width: '50%',
    margin: 'auto',
  },
  textField: {
    width: '75%',
    marginRight: '5%',
  },
  textFieldLabel: {
    color: '#6b6b6b',
  },
  askButton: {
    width: '20%',
  },
};

const AskForm = ({ name }) => (
  <Paper style={ style.paperWrap }>
    <TextField
      name="question"
      floatingLabelText={ `Ask a question about ${name}...` }
      floatingLabelStyle={ style.textFieldLabel }
      style={ style.textField }
      autoComplete="off"
    />
    <FlatButton
      label="Ask"
      onTouchTap={ this.send }
      style={ style.askButton }
      primary
    />
  </Paper>
);

AskForm.propTypes = {
  name: PropTypes.string.isRequired,
};


export default AskForm;
