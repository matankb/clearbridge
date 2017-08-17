import React from 'react';

import { fetchJson } from '~/shared/js/utils/fetch';

import StatusToast from './StatusToast';

const fetchActions = Component => {

  class FetchActionProvider extends React.Component {

    state = {
      fetching: false,
      fetched: false,
      error: null,
    }

    fetchAction = async (url, fetchOpts, toastOpts, successCallback = () => {}) => {
      this.setState({
        fetching: true,
        fetched: false,
        fetchingMessage: toastOpts.fetchingMessage,
        fetchedMessage: toastOpts.fetchedMessage,
        errorMessage: toastOpts.errorMessage,
      });
      try {
        successCallback(await fetchJson(url, fetchOpts));
        this.setState({ fetching: false, fetched: true });
      } catch (e) {
        this.setState({ fetching: false, error: e });
      }
    }

    render() {
      return (
        <span>
          <Component fetchAction={ this.fetchAction } { ...this.props } />
          <StatusToast
            fetching={ this.state.fetching }
            fetched={ this.state.fetched }
            error={ this.state.error }

            fetchingMessage={ this.state.fetchingMessage }
            fetchedMessage={ this.state.fetchedMessage }
            errorMessage={ this.state.errorMessage }

          />
        </span>
      );
    }

  }

  FetchActionProvider.displayName =
    `LoadableActionProvider(${Component.displayName || Component.name})`;

  return FetchActionProvider;

};

export default fetchActions;
