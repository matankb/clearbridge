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
