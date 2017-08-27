import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPropTypes from '~/shared/js/constants/prop-types';
import LoadableContent from '~/shared/js/components/LoadableContent';
import fetchActions from '~/shared/js/hocs/fetch-actions';

import { requestAsks } from '~/teacher/js/reducers/asks';
import '~/teacher/css/asks.less';

import Ask from './Ask';

class Asks extends React.Component {

  static propTypes = {
    fetch: AppPropTypes.fetch.isRequired,
    asks: PropTypes.arrayOf(AppPropTypes.ask).isRequired,

    requestAsks: PropTypes.func.isRequired,
    fetchAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.requestAsks();
  }

  sendAnswer = (id, answer) => {

    const url = `/api/asks/${id}`;

    const fetchOpts = {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          answer,
        },
      }),
    };

    const toastOpts = {
      fetchingMessage: 'Sending answer...',
      fetchedMessage: 'Answer sent!',
      errorMessage: 'Error sending answer',
    };

    this.props.fetchAction(url, fetchOpts, toastOpts);

  }

  render() {
    return (
      <div className="asks">
        <h1 className="title">Asks</h1>
        <LoadableContent
          isLoading={ this.props.fetch.isFetching }
          error={ this.props.fetch.error }
          retry={ this.props.requestAsks }
        >
          <div className="ask-list">
            {
            this.props.asks.map(ask => (
              <Ask
                key={ ask.id }
                id={ ask.id }
                question={ ask.question }
                answer={ ask.answer }
                topic={ ask.topic }
                sendAnswer={ this.sendAnswer }
              />
            ))
          }
          </div>
        </LoadableContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetch: state.asks.fetch,
    asks: state.asks.asks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestAsks: () => dispatch(requestAsks()),
  };
}

export default fetchActions(connect(mapStateToProps, mapDispatchToProps)(Asks));
