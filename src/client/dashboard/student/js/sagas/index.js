import watchFeedback from '../../../shared/js/sagas/feedback.js';

export default function* rootSaga() {
  yield [
    watchFeedback(),
  ];
}
