import { combineReducers } from 'redux';

import topics from './topics';
import search from './search';
import feedback from '../../../shared/js/reducers/feedback';
import about from '../../../shared/js/reducers/about';

export default combineReducers({ topics, search, feedback, about });
