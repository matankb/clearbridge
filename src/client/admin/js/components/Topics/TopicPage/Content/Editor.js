import React from 'react';

import ReactQuill from 'react-quill';

// import stylesheet
import 'react-quill/dist/quill.snow.css';

const editor = {
  modules: {
    toolbar: [
      [{ header: '1' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  },
};

const Content = ({ content, onChange }) => (
  <div style={{
    color: 'black',
    fontSize: '1.5em',
  }}
  >
    <ReactQuill
      onChange={ onChange }
      modules={ editor.modules }
      value={ content }
    />

  </div>
);

export default Content;
