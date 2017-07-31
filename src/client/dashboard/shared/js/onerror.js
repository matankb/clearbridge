import sendReport, { ERROR } from './report';

window.onerror = (msg, url, ln, col, error) => {
  sendReport(ERROR, { error: error ? error.stack : msg });
};
