import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

const style = {
  button: {
    marginRight: 10,
    marginBottom: 20,
  },
  input: {
    marginTop: -10, // HACK to lower height
  },
};

class AssignStudent extends React.Component {

  constructor() {
    super();
    this.state = { assigning: false };
  }

  handleButtonClick() {
    this.setState({ assigning: !this.state.assigning });
  }

  render() {
    let studentNames = this.props.students.map(student => student.name);
    return (
      <span>
        <label>
          <RaisedButton
            label="Add Student"
            style={ style.button }
            primary
            onClick={ this.handleButtonClick.bind(this) }
          />
          What
          {
            this.state.assigning &&
            <AutoComplete
              dataSource={ studentNames }
              style={ style.input }
            />
          }
        </label>
      </span>
    );
  }

}

export default AssignStudent;
