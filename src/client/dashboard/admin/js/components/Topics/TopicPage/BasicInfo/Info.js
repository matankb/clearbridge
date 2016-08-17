import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

const style = {
  name: {
    fontSize: 30,
    fontWeight: 300,
  },
  hiddenUnderline: {
    visibility: 'hidden',
  },
  shownUnderline: {
    visibility: 'visible',
  },
};

const Info = () => {
  return (
    <div className="info">
      <TextField
        value="T'fillah - Prayer"
        style={ style.name }
        underlineStyle={ style.hiddenUnderline }
        underlineFocusStyle={ style.shownUnderline }
      />
      <TextField
        multiLine
        rows={ 4 }
        rowsMax={ 4 }
        underlineStyle={ style.hiddenUnderline }
        underlineFocusStyle={ style.shownUnderline }
        value="This is the blurb LoremLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"
      />
    </div>
  );
};

export default Info;
