import React from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import { fetchUsers, setSelectedUsers, setCreationStatus } from '../../actions/users';
import VisibleUserList from './VisibleUserList';
import FilterBar from './FilterBar';
import ActionBar from './ActionBar';
import CreateUser from './CreateUser';
import '../../../css/users.scss';
const style = {
  fab: {
    position: 'fixed',
    bottom: 50,
    right: 82,
    zIndex: 2,
  },
};

class Users extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div className="users">
        <FloatingActionButton
          style={ style.fab }
          backgroundColor={ colors.accent }
          onClick={ this.props.handleFABClick }
        >
          <AddIcon />
        </FloatingActionButton>
        <FilterBar shown={ this.props.filterBarShown} />
        <ActionBar shown={ this.props.actionBarShown } />
        <VisibleUserList handleRowSelection={ this.props.handleRowSelection } />
        <CreateUser open={ this.props.isCreating } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterBarShown: !state.users.userList.isSelecting,
    actionBarShown: state.users.userList.isSelecting,
    isCreating: state.users.create.isCreating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    handleRowSelection: index => dispatch(setSelectedUsers(index)),
    handleFABClick: () => dispatch(setCreationStatus(true)),
  };
}

Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default Users;
