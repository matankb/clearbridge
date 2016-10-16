import { takeEvery } from 'redux-saga';
import { SEND_FEEDBACK, feedbackSent, feedbackSentError } from '../reducers/feedback/sending';
function* feedback() {
}
export default function* watchFeedback() {
  yield takeEvery(SEND_FEEDBACK, feedback);
