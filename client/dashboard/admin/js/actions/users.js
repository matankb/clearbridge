export const REQUEST_USERS = 'USERS/REQUEST_USERS';
export const RECEIVE_USERS = 'USERS/RECEIVE_USERS';
export const FETCH_USERS = 'USERS/FETCH_USERS';
export const REQUEST_USER_REMOVAL = 'USERS/REQUEST_USER_REMOVAL';
export const RECEIVE_USER_REMOVAL = 'USERS/RECEIVE_USER_REMOVAL';
export const SET_CREATION_STATUS = 'USERS/SET_CREATION_STATUS';
export const SET_CREATION_TYPE = 'USERS/SET_CREATION_TYPE';
export const SET_CREATION_DATA = 'USERS/SET_CREATION_DATA';
export const SHOW_MORE_CREATION_OPTIONS = 'USERS/SHOW_MORE_CREATION_OPTIONS';
export const RESET_CREATION_DATA = 'USERS/RESET_CREATION_DATA';
export const REQUEST_USER_CREATION = 'USERS/REQUEST_USER_CREATION';
export const RECEIVE_USER_CREATION = 'USERS/RECEIVE_USER_CREATION';

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


export function setCreationStatus(isCreating) {
  return {
    type: SET_CREATION_STATUS,
    isCreating,
  };
}

export function setCreationType(creationType) {
  return {
    type: SET_CREATION_TYPE,
    creationType, // to avoid duplicate keys
  };
}

export function setCreationData(data) {
  return {
    type: SET_CREATION_DATA,
    data,
  };
}

export function showMoreCreationOptions() {
  return {
    type: SHOW_MORE_CREATION_OPTIONS,
  };
}

export function resetCreationData() {
  return {
    type: RESET_CREATION_DATA,
  };
}

export function requestUserCreation() {
  return {
    type: REQUEST_USER_CREATION,
  };
}

export function receiveUserCreation(user) {
  return {
    type: RECEIVE_USER_CREATION,
    user,
  };
}

export function postUser() {
  return function(dispatch, getState) {

    let state = getState();
    const emailDomain = state.users.create.type > 0 ? 'jcdsboston' : 'jcdsms';

    dispatch(requestUserCreation());
    fetch('/api/users/', {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        type: state.users.create.type,
        data: {
          name: state.users.create.data.name,
          email: `${state.users.create.data.email}@${emailDomain}.org`,
        },
      }),
    })
      .then(data => data.json())
      .then(user => dispatch(receiveUserCreation(user)));

  };

}
