import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import SearchResults from './../SearchResults';
import LoadableContent from '../../../../../shared/js/components/LoadableContent';

import requiresTopicList from '../../../hocs/requires-topic-list';

import { requestSearch } from '../../../reducers/search';
import { findTopicById } from '../../../utils';
import { parseQuery } from '../../../../../shared/js/utils';

function getQueryFor(props) {
  return parseQuery(props.location.search).q;
}

class SearchPage extends React.Component {

  componentDidMount() {
    this.props.requestSearch(this.getQuery());
  }

  componentDidUpdate(prevProps) {
    if (getQueryFor(prevProps) !== this.getQuery()) {
      this.props.requestSearch(this.getQuery());
    }
  }

  getQuery() {
    return getQueryFor(this.props);
  }

  render() {

    return (
      <div className={ classnames('search-page', this.props.open && 'search-page-open') }>
        <h1>Search results for &quot;{ this.getQuery() }&quot;</h1>
        <LoadableContent
          isLoading={ !this.props.topicListLoaded || this.props.isFetching }
          error={ this.props.error }
          retry={ this.props.requestSearch }
        >
          <SearchResults
            results={ this.props.results }
          />
        </LoadableContent>
      </div>
    );

  }
}

function populateResults(results, topicList) {
  return results.map(result => ({ ...result, ...findTopicById(topicList, result.id) }));
}

function mapStateToProps(state) {
  return {
    results: populateResults(state.search.results, state.topics.topics),
    isFetching: state.search.isFetching,
    error: state.search.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSearch: query => dispatch(requestSearch(query)),
  };
}

export default requiresTopicList(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
