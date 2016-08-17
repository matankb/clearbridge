import CreateUser from './CreateUser';
const style = {
  fab: {
    position: 'fixed',
    bottom: 50,
    right: 82,
    zIndex: 2,
  },
};
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
        <VisibleUserList handleRowSelection={ this.props.handleRowSelection } />
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
