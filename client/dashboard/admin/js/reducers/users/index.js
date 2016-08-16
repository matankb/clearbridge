import { combineReducers } from 'redux';

import create from './create';
import userList from './user-list';

const users = combineReducers({
  create,
  userList,
});

export default users;
