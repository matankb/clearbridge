import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import LockOutlineIcon from 'material-ui/svg-icons/action/lock-outline';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

import HideIcon from '~/shared/assets/incognito.svg';
import ErrorBoundry from '~/shared/js/components/ErrorBoundry';
import colors from '~/shared/js/constants/colors';

import MoreOptions from './MoreOptions';

const style = {
  editingField: {
    fontSize: 20,
    width: 500,
    marginBottom: -100, // reverse added height with input underline
  },
  editingButtons: {
    paddingBottom: 0,
    verticalAlign: 'bottom',
  },
  iconsWrap: {
    marginRight: 10,
  },
  iconButton: {
    position: 'relative',
    top: 5, // same line as question
    marginRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    height: 0, // prevent iconbutton from changing vertical padding of askitem
    cursor: 'normal',
  },
  lockIcon: {
    width: 20,
    height: 20,
  },
};

class AskItem extends React.Component {

  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string,
    private: PropTypes.bool.isRequired,
    named: PropTypes.bool.isRequired,

    showControls: PropTypes.bool.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    answer: null, // null answer means question is unanswered
  };

  state = {
    isEditing: false,
    editingData: {
      question: this.props.question,
      private: this.props.private,
      named: this.props.named,
    },
  }

  updateEditingData(newData) {
    this.setState({
      editingData: {
        ...this.state.editingData,
        ...newData,
      },
    });
  }

  startEditing = () => {
    this.setState({ isEditing: true });
  }
  handleQuestionChange = e => {
    this.updateEditingData({ question: e.target.value });
  }

  handlePublicClick = () => {
    this.updateEditingData({ private: false });
  }
  handlePrivateClick = () => {
    this.updateEditingData({ private: true });
  }
  handleNamedClick = () => {
    this.updateEditingData({ named: true });
  }
  handleUnnamedClick = () => {
    this.updateEditingData({ named: false });
  }

  saveEdits = () => {
    this.setState({ isEditing: false });
    this.props.handleEdit(this.state.editingData);
  }
  cancelEdits = () => {
    this.setState({ isEditing: false });
    this.updateEditingData({ question: this.props.question });
  }

  render() {
    const editingPanel = (
      <div>
        <TextField
          name="ask-editing"
          value={ this.state.editingData.question }
          onChange={ this.handleQuestionChange }
          autoFocus
          style={ style.editingField }
        />
        <MoreOptions
          private={ this.state.editingData.private }
          named={ this.state.editingData.named }

          handlePublicClick={ this.handlePublicClick }
          handlePrivateClick={ this.handlePrivateClick }
          handleNamedClick={ this.handleNamedClick }
          handleUnnamedClick={ this.handleUnnamedClick }
        />
        <IconButton
          onClick={ this.saveEdits }
          style={ style.editingButtons }
        >
          <CheckIcon color={ colors.gray } />
        </IconButton>
        <IconButton
          onClick={ this.cancelEdits }
          style={ style.editingButtons }
        >
          <CancelIcon color={ colors.gray } />
        </IconButton>
      </div>
    );

    const question = (
      <span>
        <span style={ style.iconsWrap }>
          {
            this.props.private &&
            <IconButton style={ style.iconButton } disableTouchRipple tooltip="Private">
              <LockOutlineIcon style={ style.lockIcon } color={ colors.gray } />
            </IconButton>
          }
          {
            !this.props.named && this.props.showControls &&
            <IconButton style={ style.iconButton } disableTouchRipple tooltip="Name Hidden">
              <HideIcon style={ style.lockIcon } color={ colors.gray } />
            </IconButton>
          }
        </span>
        { this.props.question }
      </span>
    );
    const editingControls = (
      <div className="controls">
        <IconButton
          onClick={ this.startEditing }
          disabled={ this.state.isEditing }
          tooltip="Edit"
        >
          <EditIcon color={ colors.gray } />
        </IconButton>
        <IconButton onClick={ this.props.handleDelete } tooltip="Delete">
          <DeleteIcon color={ colors.gray } />
        </IconButton>
      </div>
    );

    return (
      <div className="ask-item">
        <h3 className="question" style={ this.state.isEditing ? { marginTop: 20 } : {} }>
          {
            this.state.isEditing ?
              editingPanel :
              question
          }
        </h3>
        {
          this.props.showControls &&
            editingControls
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

const AskList = ({
  asks, userID, deleteAsk, editAsk,
}) => {

  // display answered asks first
  // TODO: refactor first part to be a.answer === b.answer
  const orderedAsks = asks.sort((a, b) => {
    return (a.answer && b.answer) || (!a.answer && !b.answer) ? 0 : a.answer && !b.answer ? -1 : 1;
  });

  const askElements = orderedAsks.map(ask => (
    <ErrorBoundry>
      <CSSTransition
        classNames="ask-item"
        timeout={ 200 }
        key={ ask.id }
      >
        <AskItem
          id={ ask.id }
          question={ ask.question }
          answer={ ask.answer }
          private={ ask.private }
          named={ ask.named }
          showControls={ ask.asker === userID }
          handleDelete={ () => deleteAsk(ask.id) }
          handleEdit={ newAsk => editAsk(ask.id, newAsk) }
        />
      </CSSTransition>
    </ErrorBoundry>
  ));

  return (
    <div className="ask-list">

      <TransitionGroup>
        {askElements}
      </TransitionGroup>

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
