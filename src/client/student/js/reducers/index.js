import { combineReducers } from 'redux';

import feedback from '~/shared/js/reducers/feedback';
import about from '~/shared/js/reducers/about';

import topics from './topics';
import search from './search';

export default combineReducers({ topics, search, feedback, about });
