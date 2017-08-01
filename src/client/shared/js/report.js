import fetch from 'fetch-reject';

// report types
export const SUGGESTION = 0;
export const PROBLEM = 1;
export const ERROR = 2;
export const TOPIC = 3;

// returns serializable navigator object
function getNavigator() {
  let _navigator = {};
  for (let i in navigator) { // eslint-disable-line guard-for-in
    _navigator[i] = navigator[i];
  }
  return _navigator;
}

// generic report routine. Passes any data for server to handle
export default function sendReport(type, data) {
  return fetch('/api/report/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      data,
      navigator: getNavigator(),
    }),
  });
}
