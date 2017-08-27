import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const baseStyle = {
  wrap: {
    margin: '1%',
    display: 'inline-block',
    padding: 10,
    paddingTop: 15,
    width: '48%',
  },
  textfield: {
    width: '90%',
    fontSize: '14px',
    display: 'block',
  },
};

class Ask extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string,
    topic: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string,
    }).isRequired,
    sendAnswer: PropTypes.func.isRequired,
  }

  static defaultProps = {
    answer: '',
  }

  state = {
    answer: this.props.answer,
    isAnswered: !!this.props.answer,
  }

  handleAnswerChange = e => this.setState({ answer: e.target.value })
  handleSubmitTap = () => this.props.sendAnswer(this.props.id, this.state.answer);

  render() {

    const style = {
      ...baseStyle,
      wrap: {
        ...baseStyle.wrap,
        borderBottom: `10px solid ${this.props.topic.color}`,
      },
    };

    return (
      <Paper style={ style.wrap}>

        <span style={ style.question }>{ `${this.props.question} `}</span>

        <i style={{ color: 'gray', fontSize: 14 }}>- { this.props.topic.name }</i>

        <TextField
          type="text"
          multiLine
          rows={ 2 }
          rowsMax={ 2 }
          value={ this.state.answer }
          onChange={ this.handleAnswerChange }
          style={ style.textfield }
        />

        <FlatButton label="Answer" onTouchTap={ this.handleSubmitTap } />

      </Paper>
    );
  }

  }

export default Ask;
