import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const style = {
  underline(editing) {
    let styles = {};
    if (editing) {
      styles.visibility = 'visible';
    } else {
      styles.visibility = 'hidden';
    }
    return styles;
  },
  name: {
    width: '100%',
    fontSize: 26,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  content: {
    width: '100%',
  },
  buttons: {
    marginLeft: 10,
  },
};

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingData: {
        // this is not an anti-pattern because it is being used as seed data
        name: this.props.name || '',
        content: this.props.content || '',
      },
    };
  }
  handleNameChange(e) {
    this.setState({ editingData: { name: e.target.value } });
  }
  handleContentChange(e) {
    this.setState({ editingData: { content: e.target.value } });
  }
  render() {
    const actions = [
      <FlatButton
        style={ style.buttons }
        label="Cancel"
        secondary
        onTouchTap={ this.props.handleCancel }
        key={ 1 }
      />,
      <RaisedButton
        style={ style.buttons }
        label="Save"
        primary
        onTouchTap={ () => this.props.handleSave(this.state.editingData) }
        key={ 0 }
      />,
    ];
    return (
      <div
        onClick={ this.props.handleSectionClick }
        className={ this.props.isEditing ? 'section editing' : 'section'}
      >
        <TextField
          value={ this.props.isEditing ? this.state.editingData.name : this.props.name }
          onChange={ this.handleNameChange.bind(this) }
          hintText="Section Name"
          style={ style.name}
          underlineStyle={ style.underline(this.props.isEditing) }
        />
        <TextField
          value={ this.props.isEditing ? this.state.editingData.content : this.props.content }
          onChange={ this.handleContentChange.bind(this) }
          multiLine
          rows={ this.props.isEditing ? 4 : 1 }
          hintText="Section Content"
          style={ style.content }
          underlineStyle={ style.underline(this.props.isEditing) }
        />
        <div className="action-bar">
          { this.props.isEditing && actions }
        </div>
      </div>
    );
  }
}

export default Section;
