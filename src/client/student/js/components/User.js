import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestUser } from '../reducers/user';

// this component will become a profile/settings page
// for now it's just for loading user data into redux

class User extends React.Component {

  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return null;
  }

}

export default connect(() => ({}), dispatch => ({
  fetchUser: () => dispatch(requestUser()),
}))(User);
