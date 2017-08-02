import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  buttonWrap: {
    textAlign: 'right',
  },
  button: {
    marginRight: 10,
  },
};

const Actions = props => {
  return (
    <div style={ style.buttonWrap }>
      <FlatButton
        label="Cancel"
        style={ style.button }
        onTouchTap={ props.handleCancel }
      />
      { !props.final &&
      <RaisedButton
        label="Next"
        primary
        style={ style.button }
        onTouchTap={ props.handleNextStage }
      />
      }
      { props.final &&
        <RaisedButton
          label="Create"
          primary
          style={ style.button }
          onTouchTap={ props.handleCreate }
        />
      }
    </div>
  );
};

export default Actions;
