class Users extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div className="users">
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
}
Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
export default Users;
