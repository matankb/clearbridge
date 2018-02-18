import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { removeSelectedUsers } from '../../actions/users';

const style = {
  icons: {
    width: 50,
    height: 50,
  },
};

let ActionBar = props => {
  return (
    <div className={ props.shown ? 'action-bar shown' : 'action-bar' } >
      <IconButton
        style={ style.icons }
        onClick={ props.handleRemove }
      >
        <DeleteIcon color="#5f6265" hoverColor="black" />
      </IconButton>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    handleRemove: () => dispatch(removeSelectedUsers()),
  };
}

ActionBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionBar);

export default ActionBar;
