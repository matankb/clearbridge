import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const style = {
  paperWrap: {
    padding: '0px 30px 20px 30px',
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
  errorText: {
    // workaround for position: relative div (which material-ui creates) forces button to new line
    position: 'absolute',
    bottom: -12,
  },
};

class AskForm extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    sendAsk: PropTypes.func.isRequired,
  }

  state = {
    question: '',
    validationError: false,
  }


  handleQuestionChange = e => this.setState({ question: e.target.value });
  handleAskClick = () => {
    if (this.state.question.trim() !== '') { // ensure question is not empty
      this.props.sendAsk(this.state.question);
      this.setState({ question: '', validationError: false });
    } else {
      this.setState({ validationError: true });
    }
  }

  render() {
    return (
      <div className="ask-form">
        <Paper style={ style.paperWrap }>

          <TextField
            name="question"
            value={ this.state.question }
            onChange={ this.handleQuestionChange }

            style={ style.textField }
            autoComplete="off"

            floatingLabelText={ `Ask a question about ${this.props.name}...` }
            floatingLabelStyle={ style.textFieldLabel }
            errorText={ this.state.validationError ? 'Please enter a question' : null }
            errorStyle={ style.errorText }
          />

          <FlatButton
            label="Ask"
            onTouchTap={ this.handleAskClick }

            style={ style.askButton }
            primary
          />

        </Paper>
      </div>
    );
  }

}
export default AskForm;
