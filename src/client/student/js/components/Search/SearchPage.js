import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import LoadableContent from '../../../../shared/js/components/LoadableContent';
import { requestSearch } from '../../reducers/search';

class SearchPage extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.open && prevProps.query !== this.props.query) {
      this.props.requestSearch();
    }
  }

  render() {
    return (
      <div className={ classnames('search-page', this.props.open && 'search-page-open') }>
        <LoadableContent
          isLoading={ this.props.isFetching }
          error={ this.props.error }
          retry={ this.props.requestSearch }
        >
          { this.props.results }
        </LoadableContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
    results: state.search.results,
    open: state.search.open,
    isFetching: state.search.isFetching,
    error: state.search.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSearch: () => dispatch(requestSearch()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
