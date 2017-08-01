import { combineReducers } from 'redux';

import sending from './sending';
import data from './data';
import open from './open';

const feedback = combineReducers({ sending, data, open });

export default feedback;
