import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import MoreOptions from './MoreOptions';

const style = {
  paperWrap: {
    padding: '0px 30px 20px 30px',
  },
  textField: {
    width: '65%',
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
    private: false,
    named: true,
    validationError: false,
  }


  handleQuestionChange = e => this.setState({ question: e.target.value });
  handleAskClick = () => {

    if (this.state.question.trim() !== '') { // ensure question is not empty
      this.props.sendAsk({
        question: this.state.question,
        private: this.state.private,
        named: this.state.named,
      });
      this.setState({ question: '', validationError: false, private: false });
    } else {
      this.setState({ validationError: true });
    }

  }

  handlePublicClick = () => {
    this.setState({ private: false });
  }
  handlePrivateClick = () => {
    this.setState({ private: true });
  }
  handleNamedClick = () => {
    this.setState({ named: true });
  }
  handleUnnamedClick = () => {
    this.setState({ named: false });
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
            onClick={ this.handleAskClick }

            style={ style.askButton }
            primary
          />

          <MoreOptions
            private={ this.state.private }
            named={ this.state.named }

            handlePrivateClick={ this.handlePrivateClick }
            handlePublicClick={ this.handlePublicClick }
            handleNamedClick={ this.handleNamedClick }
            handleUnnamedClick={ this.handleUnnamedClick }
          />

        </Paper>
      </div>
    );
  }

}
export default AskForm;
