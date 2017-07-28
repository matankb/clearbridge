import fetchReject from 'fetch-reject';

export function fetchJson(url, opts) {
  return fetchReject(url, { credentials: 'same-origin', ...opts })
    .then(r => r.json());
}
