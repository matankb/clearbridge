import React from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';

import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';

import { setQuery, openSearch } from '../../reducers/search';

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
        this.props.search(this.state.query);
        // falls through to close after searching
      case 'Escape':
        this.close();
        break;
      default:
        break;
    }
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
          onKeyDown={ this.handleKeyDown }

          style={{ color: this.props.color }}

        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: query => {
      dispatch(setQuery(query));
      dispatch(openSearch());
    },
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(SearchBar);
