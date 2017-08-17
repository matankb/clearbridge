import fetchReject from 'fetch-reject';

export function fetchJson(url, opts) {
  return fetchReject(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    ...opts,
  })
    .then(r => r.json());
}

export function formatError(error) {
  return {
    offline: !error.status, // failed to fetch errors (therefore offline) don't include a status
    status: error.status,
  };
}
