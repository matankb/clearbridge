import React from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';

import PendingUserList from './PendingUserList';

import { fetchUsers } from '../../../../../actions/users';

class AddUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameToAdd: '',
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  handleInputChange(e) {
    if (e.keyCode === 13) { // pressed enter
      this.props.handleUserAdd();
    } else {
      this.setState({ nameToAdd: e.target.value });
    }
  }

  render() {
    return (
      <div className="stage">
        This topic will only show on the student's dashboard once at least one section is created
        <AutoComplete
          dataSource={ this.props.userList }
          hintText="Student Name or Email"
          onKeyDown={ this.handleInputChange.bind(this) }
        />
        <FlatButton label="Add" />
        <PendingUserList
          users={ this.props.pendingUsers }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pendingUsers: state.topics.create.data.pendingUsers,
    userList: state.users.userList.users.map(user => user.name),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    handleUserAdd: () => dispatch(),
  };
}

AddUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUsers);

export default AddUsers;
