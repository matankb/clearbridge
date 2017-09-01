import { all } from 'redux-saga/effects';

import watchFeedback from '~/shared/js/sagas/feedback';
import watchAsks from './asks';

export default function* rootSaga() {
  yield all([
    watchAsks(),
    watchFeedback(),
  ]);
}
