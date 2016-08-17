import React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  table: {
    header: {
      background: '#f4f4f4',
    },
    body: {
    },
  },
};

function toTableRows(arr, extra) {
  return arr.map(item => {
    return (
      <TableRow key={ item._id } >
        <TableRowColumn>{ item.name }</TableRowColumn>
        <TableRowColumn>{ item.grade }</TableRowColumn>
        <TableRowColumn>{ extra }</TableRowColumn>
      </TableRow>
    );
  });
}

const StudentList = ({ students, groups }) => {
  return (
    <Table
      bodyStyle={ style.table.body }
    >
      <TableHeader>
        <TableRow style={ style.table.header }>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Grade</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        { toTableRows(groups, <span className="group-marker">Group</span>) }
        { toTableRows(students) }
      </TableBody>
    </Table>
  );
};

export default StudentList;
