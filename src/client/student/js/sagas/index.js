import { all } from 'redux-saga/effects';

import watchFeedback from '~/shared/js/sagas/feedback';

import watchTopics from './topics';
import watchSearch from './search';
import watchUser from './user';

export default function* rootSaga() {
  yield all([
    watchTopics(),
    watchSearch(),
    watchUser(),
    watchFeedback(),
  ]);
}
