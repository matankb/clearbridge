import {
  SET_VISIBILITY_FILTER,
  SET_SELECTED_USERS,
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_USER_REMOVAL,
  RECEIVE_USER_REMOVAL,
  RECEIVE_USER_CREATION,
} from '../../actions/users.js';

import { RECEIVE_STUDENT_ASSIGNMENT } from '../../actions/topics/';

const defaultState = {
  isSelecting: false,
  visibilityFilter: 0, // all
  isFetching: false,
  selected: [],
  users: [
  ],
};


// DA REDUCER
function users(state = defaultState, action) {
  switch (action.type) {

    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.filterLevel,
      };
    case SET_SELECTED_USERS:
      // convert indexes (passed to cb by table) to _ids
      return {
        ...state,
        selected: (
          action.indexes !== 'all' ? // material-ui has a weird api
          action.indexes.map(index => {
            return state.users[index]._id;
          }) :
          state.users
        ),
        isSelecting: action.indexes.length > 0,
      };
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        users: action.users,
      };
    case REQUEST_USER_REMOVAL:
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.id) {
            return {
              ...user,
              isRemoving: true,
            };
          } else {
            return user;
          }
        }),
      };
    case RECEIVE_USER_REMOVAL:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.id),
        selected: state.selected.filter(id => id !== action.id),
        isSelecting: state.selected.filter(id => id !== action.id).length > 0,
      };
    case RECEIVE_USER_CREATION:
      return {
        ...state,
        users: [
          ...state.users,
          action.user,
        ],
      };
    case RECEIVE_STUDENT_ASSIGNMENT:
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.studentId) {
            return { ...user, topics: [...user.topics, action.topicId] };
          } else {
            return user;
          }
        }),
      };
    default:
      return state;
  }
}

export default users;
