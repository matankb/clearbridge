import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {
  setCreationStatus,
  setCreationType,
  setCreationData,
  showMoreCreationOptions,
  resetCreationData,
  postUser,
} from '../../actions/users';

import '../../../css/create-user.scss';
import { colors } from '.././../../../shared/js/constants';

const style = {
  dialog: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    backgroundColor: colors.primary.dark,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    marginBottom: 30,
  },
  button: {
    moreOptions: {
      marginRight: 221,
      color: colors.darkGray,
    },
  },
  input: {
    name: {
      width: '45%',
      marginRight: '5%',
    },
    type: {
      width: 200,
      marginBottom: 10,
      marginLeft: -25,
    },
    email: {
      width: 200,
    },
  },
};

let CreateUser = props => {

  const actions = [
    <FlatButton
      label="More Options"
      style={ style.button.moreOptions }
      onTouchTap={ props.handleMoreOptions }
    />,
    <FlatButton
      label="Cancel"
      secondary
      onTouchTap={ props.handleCancel }
    />,
    <FlatButton
      label="Create"
      primary
      onTouchTap={ props.handleCreate }
    />,
  ];

  return (

      <Dialog
        open={props.open }
        modal
        title="New User"
        contentStyle={ style.dialog }
        titleStyle={ style.title }
        actions={ actions }
      >
        <TextField
          style={ style.input.name }
          hintText="First Name"
          value={ props.firstName }
          onChange={ props.handleFirstNameChange }
        />
        <TextField
          style={ style.input.name }
          hintText="Last Name"
          value={ props.lastName }
          onChange={ props.handleLastNameChange }
        />
        <DropDownMenu
          style={ style.input.type }
          value={ props.type }
          autowidth={ false }
          onChange={ props.handleTypeChange}
        >
          <MenuItem primaryText="Student" value={ 0 } />
          <MenuItem primaryText="Teacher" value={ 1 } />
          <MenuItem primaryText="Admin" value={ 2 } />
        </DropDownMenu>
        <TextField
          style={ style.input.email }
          hintText="Email"
          value={ props.email }
          onChange={ props.handleEmailChange }
        />
        <span
          style={{ color: 'rgba(0, 0, 0, 0.870588)' }}
        >
          { props.emailExtension }
        </span>
        <br />
        {
          props.moreOptionsShown ?
          (
            <div className="more-options">
              Grade
              <DropDownMenu
                value={ props.grade }
                autowidth={ false }
                onChange={ props.handleGradeChange }
              >
                <MenuItem primaryText="5" value={ 5 } />
                <MenuItem primaryText="6" value={ 6 } />
                <MenuItem primaryText="7" value={ 7 } />
                <MenuItem primaryText="8" value={ 8 } />
              </DropDownMenu>
            </div>
          ) :
          null
        }
    </Dialog>

  );
};

function getEmailExtension(type) {
  return type > 0 ? '@jcdsboston.org' : '@jcdsms.org';
}

function mapStateToProps(state) {
  return {
    type: state.users.create.type,
    firstName: state.users.create.data.firstName,
    lastName: state.users.create.data.lastName,
    email: state.users.create.data.email,
    emailExtension: getEmailExtension(state.users.create.type),
    grade: state.users.create.data.grade,
    moreOptionsShown: state.users.create.moreOptionsShown,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleTypeChange: (e, index) => {
      // using e.target throws an error. no idea why.
      dispatch(setCreationType(index));
    },
    handleFirstNameChange: e => dispatch(setCreationData({
      firstName: e.target.value,
    })),
    handleLastNameChange: e => dispatch(setCreationData({
      lastName: e.target.value,
    })),
    handleEmailChange: e => {
      dispatch(setCreationData({
        email: e.target.value,
      }
    ));},
    handleGradeChange: (e, index) => dispatch(setCreationData({
      grade: index + 5, // index 0 is 5th, 1 is 6th, etc.1
    })),
    handleMoreOptions: () => dispatch(showMoreCreationOptions()),
    handleCancel: () => {
      dispatch(setCreationStatus(false));
      dispatch(resetCreationData());
    },
    handleCreate: () => {
      dispatch(postUser());
      dispatch(setCreationStatus(false));
      dispatch(resetCreationData());
    },
  };
}

CreateUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);

export default CreateUser;
