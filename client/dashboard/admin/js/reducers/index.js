import { combineReducers } from 'redux';

import users from './users';
import topics from './topics';

let rootReducer = combineReducers({
  users,
  topics
});

export default rootReducer;
