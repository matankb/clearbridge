import React from 'react';
import { Link } from 'react-router';
import isEqual from 'lodash.isEqual';
import { Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn } from 'material-ui/Table';

const style = {
  link: {
    color: 'black',
    textDecoration: 'none',
  },
};

class UserList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // deep equal to prevent useless re-rendering that looses table selection
    // (before redux store updates)
    return !isEqual(nextProps.users, this.props.users);
  }
  render() {
    return (
      <div className="user-list">
        <Table
          multiSelectable
          onRowSelection={ this.props.handleRowSelection }
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={ false }
          >
            {
              this.props.users.map(user => {
                return (
                  <TableRow key={ user._id }>
                    <TableRowColumn>
                      <Link to={ `/dashboard/users/${user._id}` } style={ style.link }>
                        { user.name }
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn>{ user._type }</TableRowColumn>
                    <TableRowColumn>{ user.email }</TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserList;
