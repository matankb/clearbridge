import React from 'react';

import ReactQuill from 'react-quill';

// import stylesheet
import 'react-quill/dist/quill.snow.css';

const editor = {
  modules: {
    toolbar: [
      [{ header: '1' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' },
      { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  },
};

const Content = ({ onChange }) => (
  <div style={{
    color: 'black',
    fontSize: '1.5em',
  }}
  >
    <ReactQuill
      onChange={ onChange }
      modules={ editor.modules }
    />

  </div>
);

export default Content;
