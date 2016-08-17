import CreateUser from './CreateUser';
class Users extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div className="users">
        <FloatingActionButton
          style={ style.fab }
          backgroundColor={ colors.accent }
          onClick={ this.props.handleFABClick }
        >
          <AddIcon />
        <CreateUser open={ this.props.isCreating } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isCreating: state.users.create.isCreating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    handleFABClick: () => dispatch(setCreationStatus(true)),
  };
}

Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default Users;
