import React from 'react';
import classnames from 'classnames';

import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';

import '../../../css/search.less';

class SearchBar extends React.Component {

  state = {
    open: false,
    query: '',
  }

  setQuery = ({ target: { value } }) => {
    this.setState({ query: value });
  }

  open = () => {
    this.setState({ open: true });
    this.focusTextField();
  }

  close = () => {
    this.setState({ open: false, query: '' });
  }

  toggleOpen = () => {
    this.setState(state => {
      if (!state.open) {
        this.focusTextField();
      }
      return { open: !state.open, query: '' };
    });
  }

  focusTextField() {
    setTimeout(() => this.textfield.focus(), 0); // textfield can't be focused in same tick
  }

  render() {
    return (
      <div className="search-bar-wrap">

        <IconButton onTouchTap={ this.toggleOpen }>
          <IconSearch color={ this.props.color } />
        </IconButton>

        <input
          className={ classnames('search-bar', this.state.open && 'search-bar-open') }
          ref={ input => { this.textfield = input; } }
          name="search"

          value={ this.state.query }
          onChange={ this.setQuery }
          onBlur={ this.close }

          style={{ color: this.props.color }}

        />
      </div>
    );
  }
}

export default SearchBar;
