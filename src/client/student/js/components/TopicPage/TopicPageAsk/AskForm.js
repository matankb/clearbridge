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

class AskForm extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    sendAsk: PropTypes.func.isRequired,
  }

  state = {
    question: '',
  }

  handleQuestionChange = e => this.setState({ question: e.target.value });
  handleAskClick = () => this.props.sendAsk(this.state.question);

  render() {
    return (
      <Paper style={ style.paperWrap }>

        <TextField
          name="question"
          onChange={ this.handleQuestionChange }

          style={ style.textField }
          autoComplete="off"

          floatingLabelText={ `Ask a question about ${this.props.name}...` }
          floatingLabelStyle={ style.textFieldLabel }
        />

        <FlatButton
          label="Ask"
          onTouchTap={ this.handleAskClick }

          style={ style.askButton }
          primary
        />

      </Paper>
    );
  }

}

export default AskForm;
