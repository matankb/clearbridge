import sendReport, { ERROR } from './report';

if (process.env.NODE_ENV === 'production') {
  window.onerror = (msg, url, ln, col, error) => {
    sendReport(ERROR, { error: error ? error.stack : msg });
  };
}
