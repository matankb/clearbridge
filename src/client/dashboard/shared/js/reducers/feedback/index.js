import { combineReducers } from 'redux';

import sending from './sending';
import data from './data';

const feedback = combineReducers({ sending, data });

export default feedback;
