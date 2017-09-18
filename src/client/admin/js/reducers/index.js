import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users/';
import topics from './topics/';
import asks from './asks';
import feedback from '../../../shared/js/reducers/feedback';

const rootReducer = combineReducers({
  users,
  topics,
  asks,
  feedback, // TODO: CHANGE
  routing: routerReducer,
});

export default rootReducer;
