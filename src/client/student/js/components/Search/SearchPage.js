import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import SearchResults from './SearchResults';
import LoadableContent from '../../../../shared/js/components/LoadableContent';
import { requestSearch, closeSearch } from '../../reducers/search';
import { selectTopic, openTopicPage } from '../../actions';
import { findTopicById } from '../../utils';

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
          <SearchResults
            results={ this.props.results }
            query={ this.props.query }
            handleResultClick={ this.props.handleResultClick }
          />
        </LoadableContent>
      </div>
    );

  }
}

function populateResults(results, topicList) {
  return results.map(id => findTopicById(topicList, id));
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
    results: populateResults(state.search.results, state.topics.topics),
    open: state.search.open,
    isFetching: state.search.isFetching,
    error: state.search.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSearch: () => dispatch(requestSearch()),
    handleResultClick: id => {
      dispatch(closeSearch());
      dispatch(selectTopic(id));
      dispatch(openTopicPage());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
