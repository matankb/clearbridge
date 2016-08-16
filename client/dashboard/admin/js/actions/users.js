export const REQUEST_USERS = 'USERS/REQUEST_USERS';
export const RECEIVE_USERS = 'USERS/RECEIVE_USERS';
export const FETCH_USERS = 'USERS/FETCH_USERS';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
  };
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function fetchUsers() {
  return function(dispatch) {
    dispatch(requestUsers());
    fetch('/api/users/', { credentials: 'same-origin' })
    .then(data => data.json())
    .then(users => {
      dispatch(receiveUsers(users));
    });
  };
}

