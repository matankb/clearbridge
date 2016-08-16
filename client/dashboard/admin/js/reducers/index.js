import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users/';
import topics from './topics/';

let rootReducer = combineReducers({
  users,
  topics,
  routing: routerReducer,
});

export default rootReducer;
