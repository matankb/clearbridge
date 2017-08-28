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

    fetchAction = (url, fetchOpts, toastOpts) => {
      this.setState({
        fetching: true,
        fetched: false,
        fetchingMessage: toastOpts.fetchingMessage,
        fetchedMessage: toastOpts.fetchedMessage,
        errorMessage: toastOpts.errorMessage,
      });
      return new Promise((resolve, reject) => {
        fetchJson(url, fetchOpts)
          .then(data => {
            this.setState({ fetching: false, fetched: true });
            resolve(data);
          })
          .catch(e => {
            this.setState({ fetching: false, error: e });
            reject(e);
            throw e; // so it can be handled by global error reporting
          });
      });
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
