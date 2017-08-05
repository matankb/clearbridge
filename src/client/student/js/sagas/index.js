import { all } from 'redux-saga/effects';

import watchTopics from './topics';
import watchSearch from './search';
import watchFeedback from '../../../shared/js/sagas/feedback';

export default function* rootSaga() {
  yield all([
    watchTopics(),
    watchSearch(),
    watchFeedback(),
  ]);
}
