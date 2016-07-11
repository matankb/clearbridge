const defaultState = {
  isSelecting: false,
  isCreating: false,
  visibilityFilter: 0, // all
  isFetching: false,
  selected: [],
  users: [
  ],
  create: {
    type: 0,
    data: {
      firstName: '',
      lastName: '',
      email: '',
      grade: 7,
    },
  },
};
function users(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default users;
