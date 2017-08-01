import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Editor from './Editor';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.topic.content };
  }
  setContent(content) {
    this.setState({ content });
  }
  save() {
    fetch(`/api/topics/${this.props.topic._id}/`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          content: this.state.content,
        },
      }),
    });
  }
  render() {
    return (
      <div>
        <Editor
          content={ this.state.content }
          onChange={ this.setContent.bind(this) }
        />
        <FlatButton
          label="Save"
          style={{
            marginLeft: 720,
          }}
          primary
          onTouchTap={ this.save.bind(this) }
          key={ 0 }
        />
      </div>
    );
  }
}

export default Content;
