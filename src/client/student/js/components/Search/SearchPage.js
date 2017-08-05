import React from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';

const SearchPage = props => (
  <div className={ classnames('search-page', props.open && 'search-page-open') }>
    This is the search page
  </div>
);

function mapStateToProps(state) {
  return {
    open: state.search.open,
  };
}

export default connect(
  mapStateToProps,
)(SearchPage);
