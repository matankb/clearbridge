import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPropTypes from '~/shared/js/constants/prop-types';
import LoadableContent from '~/shared/js/components/LoadableContent';

import { requestAsks } from '~/teacher/js/reducers/asks';

import '~/teacher/css/asks.less';

class Asks extends React.Component {

  static propTypes = {
    fetch: AppPropTypes.fetch.isRequired,
    asks: PropTypes.arrayOf(AppPropTypes.ask).isRequired,
    requestAsks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.requestAsks();
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
          {
            this.props.asks.map(ask => <div>{ ask.question }</div>)
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(Asks);
