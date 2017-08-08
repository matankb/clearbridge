import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import SearchResults from './../SearchResults';
import LoadableContent from '../../../../../shared/js/components/LoadableContent';

import requiresTopicList from '../../../hocs/requires-topic-list';

import { findTopicById } from '../../../utils';
import { fetchJson, formatError, parseQuery } from '../../../../../shared/js/utils';

function populateResults(results, topicList) {
  return results.map(result => ({ ...result, ...findTopicById(topicList, result.id) }));
}

class SearchPage extends React.Component {

  state = {
    results: [],
    isFetching: false,
    error: null,
  }

  componentDidMount() {
    this.requestSearch();
  }

  requestSearch = async () => {
    this.setState({ isFetching: true, error: null });
    try {
      const query = parseQuery(this.props.location.search).q;
      const searchResults = await fetchJson(`/api/search/?q=${query}`);
      this.setState({ isFetching: false, results: searchResults });
    } catch (e) {
      this.setState({ isFetching: false, error: formatError(e) });
    }
  }

  render() {


    return (
      <div className={ classnames('search-page', this.props.open && 'search-page-open') }>
        <h1>Search results for &quot;{ parseQuery(this.props.location.search).q }&quot;</h1>
        <LoadableContent
          isLoading={ !this.props.topicListLoaded || this.state.isFetching }
          error={ this.state.error }
          retry={ this.requestSearch }
        >
          <SearchResults
            results={ populateResults(this.state.results, this.props.topicList) }
            handleResultClick={ this.props.handleResultClick }
          />
        </LoadableContent>
      </div>
    );

  }
}


function mapStateToProps(state) {
  return {
    topicList: state.topics.topics,
  };
}


export default requiresTopicList(connect(mapStateToProps)(SearchPage));
