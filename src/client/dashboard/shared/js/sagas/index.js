import watchFeedback from './feedback';

export default function* rootSaga() {
  yield [
    watchFeedback(),
  ];
}
