import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

import StudentList from './StudentList';
import AssignStudent from './AssignStudent';

import { fetchUsers } from '../../../../actions/users';
import { assignStudent } from '../../../../actions/topics/';

const style = {
  button: {
    marginRight: 10,
    marginBottom: 20,
  },
  table: {
    header: {
      background: '#f4f4f4',
    },
    body: {
    },
  },
  dialog: {
    container: {
      width: '60%',
      maxWidth: 1000000,
    },
    body: {
      padding: 100,
    },
  },
};

class Students extends React.Component {

  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const { assignedStudents, allStudents } = this.props;
    return (
      <div className="students">
        <div className="button-wrap">
          <AssignStudent
            students={ allStudents }
            assignStudent={ this.props.assignStudent }
          />
          <FlatButton label="Remove" style={ style.button } />
        </div>
        <StudentList
          students={ assignedStudents }
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    allStudents: state.users.userList.users.filter(user => user.type === 0),
    assignedStudents: state.users.userList.users.filter(user => {
      return user.type === 0 && user.topics.indexOf(state.topics.topicList.selected) > -1;
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    assignStudent: _id => dispatch(assignStudent(_id, true)),
  };
}

Students = connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);

export default Students;
