import React from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

import StudentList from './StudentList';
import AssignStudent from './AssignStudent';

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

let Students = ({ students, groups }) => {

  return (
    <div className="students">
      <div className="button-wrap">
        <AssignStudent students={ students } />
        <FlatButton label="Add Group" style={ style.button } primary />
        <FlatButton label="Remove" style={ style.button } />
      </div>
      <StudentList
        students={ students }
        groups={ groups }
      />
    </div>
  );
};

Students = connect(
  state => {
    return {
      students: state.users.userList.users.filter(user => user.type === 0),
      groups: state.users.userList.users.filter(user => user.type === 0),
    };
  }
)(Students);

export default Students;
