import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { SEND_FEEDBACK, feedbackSent, feedbackSentError } from '../reducers/feedback/sending';
import sendReport from '../report';

const getData = state => state.feedback.data;

function* feedback() {
  // get feedback data from state
  let data = yield select(getData);
  try {
    let response = yield call(sendReport, data.type, data);
    yield put(feedbackSent(response.status));
  } catch (e) {
    yield put(feedbackSentError(e));
  }
}

export default function* watchFeedback() {
  yield takeEvery(SEND_FEEDBACK, feedback);
}
