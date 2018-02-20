import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import colors from '~/shared/js/constants/colors';


import AskMenu from './AskMenu';

const baseStyle = {
  wrap: {
    margin: '1%',
    display: 'inline-block',
    position: 'relative',
    padding: 10,
    paddingTop: 15,
    width: '48%',
  },
  textfield: {
    width: '90%',
    fontSize: '14px',
    display: 'block',
  },
  askerName: {
    color: colors.lightgray,
    fontSize: 14,
  },
  details: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },
};

// TODO: Indicate when private or unnamed

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
    private: PropTypes.bool.isRequired,
    named: PropTypes.bool.isRequired,
    askerName: PropTypes.string,
    sendAnswer: PropTypes.func.isRequired,
    deleteAsk: PropTypes.func.isRequired,
  }

  static defaultProps = {
    answer: '',
    askerName: 'Anonymous',
  }

  state = {
    answer: this.props.answer,
    isAnswered: !!this.props.answer,
  }

  handleAnswerChange = e => this.setState({ answer: e.target.value })
  handleSubmitTap = () => this.props.sendAnswer(this.props.id, this.state.answer);
  handleDeleteTap = () => this.props.deleteAsk(this.props.id);

  generateDetailsText() {
    const details = [];
    if (this.props.private) { details.push('Private'); }
    if (!this.props.named) { details.push('Asker Name Hidden'); }
    return `${this.props.topic.name} (${details.join(', ')})`;
  }

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

        <span>
          &quot;{ this.props.question }&quot; &nbsp; - &nbsp;
          <span style={ style.askerName }>
            { this.props.askerName || <i>Anonymous</i> }
          </span>
        </span>
        <div style={ style.details }> { this.generateDetailsText() }</div>

        <AskMenu handleDeleteTap={ this.handleDeleteTap } />

        <TextField
          type="text"
          multiLine
          rows={ 2 }
          rowsMax={ 2 }
          value={ this.state.answer }
          onChange={ this.handleAnswerChange }
          style={ style.textfield }
          placeholder="No answer yet"
        />

        <FlatButton label="Answer" onClick={ this.handleSubmitTap } />

      </Paper>
    );
  }

}

export default Ask;
