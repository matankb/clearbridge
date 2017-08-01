import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users/';
import topics from './topics/';
import feedback from '../../../shared/js/reducers/feedback';

let rootReducer = combineReducers({
  users,
  topics,
  feedback, // TODO: CHANGE
  routing: routerReducer,
});

export default rootReducer;
