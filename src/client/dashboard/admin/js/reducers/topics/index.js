import { combineReducers } from 'redux';

import create from './create';
import topicList from './topic-list';
import topicPage from './topic-page';

let topicReducer = combineReducers({
  create,
  topicList,
  topicPage,
});

export default topicReducer;
