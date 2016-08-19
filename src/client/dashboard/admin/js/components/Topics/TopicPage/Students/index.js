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
    const { students, groups } = this.props;
    return (
      <div className="students">
        <div className="button-wrap">
          <AssignStudent
            assignStudent={ this.props.assignStudent }
          />
          <FlatButton label="Remove" style={ style.button } />
        </div>
        <StudentList
          students={ students }
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
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
