import {
  SET_CREATION_STATUS,
  SET_CREATION_TYPE,
  SET_CREATION_DATA,
  SHOW_MORE_CREATION_OPTIONS,
  RESET_CREATION_DATA,
  REQUEST_USER_CREATION,
  RECEIVE_USER_CREATION,
} from '../../actions/users.js';

const defaultState = {
  isCreating: false,
  type: 0,
  moreOptionsShown: false,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    grade: 7,
  },
};

// COMPUTIONAL FUNCTIONS

function calculateEmail(user, type) {

  let email;

  const firstName = user.firstName.replace(/\s+/g, '');

  // account for hyphenated/two-name last names
  let lastNames;
  if (user.lastName.includes('-')) {
    lastNames = user.lastName.split('-');
  } else if (user.lastName.trim().includes(' ')) {
    lastNames = user.lastName.trim().split(' ');
  } else {
    lastNames = [user.lastName];
  }

  let initials = lastNames.map(lastName => lastName[0]);
  initials = initials.join();
  initials = initials.replace(/,/g, '');

  // calculate year of graduation
  let year = ((new Date().getYear()) - 100) + (8 - user.grade);

  if (type > 0) { // is teacher of admin
    email = `${firstName}${initials}`.toLowerCase();
  } else {
    email = `${year}${firstName}${initials}`.toLowerCase();
  }

  return email;

}

function calculateName(user) {
  return `${user.firstName} ${user.lastName}`;
}

function create(state = defaultState, action) {
  switch (action.type) {
    case SET_CREATION_STATUS:
      return {
        ...state,
        isCreating: action.isCreating,
      };
    case SET_CREATION_TYPE:
      return {
        ...state,
        type: action.creationType,
        data: {
          ...state.data,
          // recalc email, which depends on type
          email: calculateEmail(state.data, action.creationType),
        },
      };
    case SET_CREATION_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          email: calculateEmail({
            ...state.data, ...action.data, // pass latest data to fn
          }, state.type),
          fullEmail: calculateEmail({
            ...state.data, ...action.data,
          }, state.type),
          // action.data must be under email to take precedence
          ...action.data,
          name: calculateName({
            ...state.data, ...action.data,
          }),
        },
      };
    case SHOW_MORE_CREATION_OPTIONS:
      return {
        ...state,
        moreOptionsShown: true,
      };
    case RESET_CREATION_DATA:
      return {
        ...state,
        data: defaultState.data,
      };
    case REQUEST_USER_CREATION:
      return {
        ...state,
        isPutting: true,
      };
    case RECEIVE_USER_CREATION:
      return {
        ...state,
        isPutting: false,
      };
    default:
      return state;
  }
}

export default create;
