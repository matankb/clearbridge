import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import classnames from 'classnames';

import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';

import '~/student/css/search.less';

class SearchBar extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
  }

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
    this.blurTextField();
  }

  toggleOpen = () => {
    this.setState(state => {
      if (!state.open) {
        this.focusTextField();
      } else {
        this.blurTextField();
      }
      return { open: !state.open, query: '' };
    });
  }

  focusTextField() {
    setTimeout(() => this.textfield.focus(), 0); // textfield can't be focused in same tick
  }
  blurTextField() {
    setTimeout(() => this.textfield.blur(), 0);
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'Enter':
        const query = this.state.query.trim();
        if (!query) return;
        this.search(query);
        // falls through to close after searching
      case 'Escape':
        this.close();
        break;
      default:
        break;
    }
  }

  search(query) {
    this.props.history.push(`/student/search/?q=${query}`, { inApp: true });
  }

  render() {
    return (
      <div className="search-bar-wrap">

        <IconButton onClick={ this.toggleOpen }>
          <IconSearch color={ this.props.color } />
        </IconButton>

        <input
          className={ classnames('search-bar', this.state.open && 'search-bar-open') }
          ref={ input => { this.textfield = input; } }
          name="search"

          tabIndex={ -1 }

          value={ this.state.query }
          onChange={ this.setQuery }
          onBlur={ this.close }
          onKeyDown={ this.handleKeyDown }

          style={{ color: this.props.color }}

        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
