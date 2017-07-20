import React from 'react';

import ReactQuill from '@djyde/react-quill';
import FlatButton from 'material-ui/FlatButton';

// import stylesheet
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
    ],
  },
};

const Sections = ({ onChange }) => (
  <div style={{
    color: 'black',
    fontSize: '1.5em',
  }}>
    <ReactQuill
      options={options}
      onChange={ onChange }
    />

  </div>
);

export default Sections;
