import React from 'react';
import { connect } from 'react-redux';

const style = {
  icons: {
    width: 50,
    height: 50,
  },
};

let ActionBar = props => {
  return (
    <div className={ props.shown ? 'action-bar shown' : 'action-bar' } >
    </div>
  );
};

export default ActionBar;
