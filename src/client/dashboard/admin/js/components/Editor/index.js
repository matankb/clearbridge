import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

// import stylesheet
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'link'],
    ],
  },
};

const Editor = () => (
    <div>
      <RaisedButton
        label="Save"
        primary
        onTouchTap={ () => this.props.handleSave(this.state.editingData) }
        key={ 0 }
      />
    </div>
);

export default Editor;
