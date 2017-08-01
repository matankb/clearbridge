import { combineReducers } from 'redux';

import topics from './topics';
import feedback from '../../../shared/js/reducers/feedback';
import about from '../../../shared/js/reducers/about';

export default combineReducers({ topics, feedback, about });
