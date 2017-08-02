import { connect } from 'react-redux';

import UserList from './UserList';
import { setVisibilityFilter } from '../../actions/users';

function getVisibleUserList(users, filter) {
  switch (filter) {
    case 'ALL':
      return users;
    case 'STUDENTS':
      return users.filter(user => user.type === 0);
    case 'TEACHERS':
      return users.filter(user => user.type === 1);
    default:
      return users;
  }
}

function mapStateToProps(state) {
  return {
    users: getVisibleUserList(state.users.userList.users, state.users.userList.visibilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setVisibilityFilter: dispatch(setVisibilityFilter()),
  };
}

const VisibileUserList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);

export default VisibileUserList;
