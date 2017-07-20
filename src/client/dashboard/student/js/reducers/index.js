import { combineReducers } from 'redux';

import topics from './topics';
import feedback from '../../../shared/js/reducers/feedback';

export default combineReducers({ topics, feedback });
