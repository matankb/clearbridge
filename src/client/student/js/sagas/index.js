import { all } from 'redux-saga/effects';

import watchFeedback from '../../../shared/js/sagas/feedback';
import watchTopics from './topics';

export default function* rootSaga() {
  yield all([
    watchFeedback(),
    watchTopics(),
  ]);
}
