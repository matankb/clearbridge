import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

import colors from '~/shared/js/constants/colors';

const style = {
  editingField: {
    fontSize: 20,
    width: 500,
    marginBottom: -5, // reverse added height with input underline
  },
  editingButtons: {
    paddingBottom: 0,
    verticalAlign: 'bottom',
  },
};

class AskItem extends React.Component {

  state = {
    isEditing: false,
    question: this.props.question,
  }

  startEditing = () => {
    this.setState({ isEditing: true });
  }
  handleEditChange = e => {
    this.setState({ question: e.target.value });
  }
  saveEdits = () => {
    this.setState({ isEditing: false });
    this.props.handleEdit(this.state.question);
  }
  cancelEdits = () => {
    this.setState({ isEditing: false, question: this.props.question });
  }

  render() {

    const editingPanel = (
      <div>
        <TextField
          name="ask-editing"
          value={ this.state.question }
          onChange={ this.handleEditChange }
          autoFocus
          style={ style.editingField }
        />
        <IconButton
          onTouchTap={ this.saveEdits }
          style={ style.editingButtons }
        >
          <CheckIcon color={ colors.gray } />
        </IconButton>
        <IconButton
          onTouchTap={ this.cancelEdits }
          style={ style.editingButtons }
        >
          <CancelIcon color={ colors.gray } />
        </IconButton>
      </div>
    );

    return (
      <div className="ask-item">
        <h3 className="question" style={ this.state.isEditing ? { marginTop: 0 } : {} }>
          {
            this.state.isEditing ?
              editingPanel :
              this.props.question
          }
        </h3>
        {
          this.props.showControls &&
          <div className="controls">
            <IconButton
              onTouchTap={ this.startEditing }
              disabled={ this.state.isEditing }
              tooltip="Edit"
            >
              <EditIcon color={ colors.gray } />
            </IconButton>
            <IconButton onTouchTap={ this.props.handleDelete } tooltip="Delete">
              <DeleteIcon color={ colors.gray } />
            </IconButton>
          </div>
        }
        {
          this.props.answer ?
            <div className="answer">{ this.props.answer }</div> :
            <div className="no-answer">No answer yet</div>
        }
      </div>
    );
  }

}

AskItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,

  showControls: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

AskItem.defaultProps = {
  answer: null, // null answer means question is unanswered
};

const AskList = ({ asks, userID, deleteAsk, editAsk }) => {

  // display answered asks first
  const orderedAsks = asks.sort((a, b) => {
    return (a.answer && b.answer) || (!a.answer && !b.answer) ? 0 : a.answer && !b.answer ? -1 : 1;
  });

  const askElements = orderedAsks.map(ask => (
    <AskItem
      key={ ask.id }
      id={ ask.id }
      question={ ask.question }
      answer={ ask.answer }
      showControls={ ask.asker === userID }
      handleDelete={ () => deleteAsk(ask.id) }
      handleEdit={ newQuestion => editAsk(ask.id, newQuestion) }
    />
  ));

  return (
    <div className="ask-list">

      <CSSTransitionGroup
        transitionName="ask-item"
        transitionEnterTimeout={ 200 }
        transitionLeaveTimeout={ 200 }
        component="div"
      >
        {askElements}
      </CSSTransitionGroup>

    </div>
  );
};

AskList.propTypes = {
  asks: PropTypes.array.isRequired,
  userID: PropTypes.string.isRequired,

  deleteAsk: PropTypes.func.isRequired,
  editAsk: PropTypes.func.isRequired,
};

export default AskList;
